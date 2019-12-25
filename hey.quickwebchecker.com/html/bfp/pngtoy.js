function PngToy(options) {
    this.doCRC = true;
    this.allowInvalid = false;
    this.beforeSend = noop;
    Object.assign(this, options);
    function noop() {}
    this.url = null;
    this.buffer = null;
    this.view = null;
    this.chunks = [];
    this.debug = {}
}
PngToy.prototype = {
    fetch: function(src) {
        var me = this;
        me.url = src;
        me.buffer = me.chunks = me.view = null;
        me._pos = 0;
        return new Promise(function(resolve, reject) {
            if (typeof src === "string") {
                try {
                    var xhr = new XMLHttpRequest;
                    xhr.open("GET", src, true);
                    xhr.responseType = "arraybuffer";
                    me.beforeSend(xhr);
                    xhr.onerror = function(e) {
                        reject("Network error. " + e.message)
                    }
                    ;
                    xhr.onload = function() {
                        if (xhr.status === 200)
                            checkBuffer(xhr.response);
                        else
                            reject("Loading error:" + xhr.statusText)
                    }
                    ;
                    xhr.send()
                } catch (err) {
                    reject(err.message)
                }
            } else {
                checkBuffer(ArrayBuffer.isView(src) ? src.buffer : src)
            }
            function checkBuffer(buffer) {
                var view, result;
                try {
                    view = new DataView(buffer);
                    if (buffer.byteLength > 66 && view.getUint32(0) === 2303741511 && view.getUint32(4) === 218765834) {
                        result = PngToy._getChunks(buffer, view, me.doCRC, me.allowInvalid);
                        me.buffer = buffer;
                        me.view = view;
                        me.chunks = result.chunks || [];
                        if (me.chunks || me.allowInvalid)
                            resolve();
                        else
                            reject(result.error)
                    } else
                        reject("Not a PNG file.")
                } catch (err) {
                    reject(err.message)
                }
            }
        }
        )
    },
    getChunk: function(chunkName) {
        var chunks = ["IHDR", "IDAT", "PLTE", "sPLT", "tRNS", "iTXt", "tEXt", "zTXt", "iCCP", "gAMA", "cHRM", "sRGB", "hIST", "sBIT", "pHYs", "bKGD", "tIME", "oFFs", "sTER", "sCAL", "pCAL", "IEND"];
        if (chunks.indexOf(chunkName) > -1) {
            return chunkName === "IEND" ? !!PngToy._findChunk(this.chunks, "IEND") : PngToy["_" + chunkName](this)
        } else {
            return PngToy._findChunk(this.chunks, chunkName)
        }
    },
    toMinimal: function(forDownload) {
        if (this.chunks.length) {
            var chunkTypes = ["IHDR", "IDAT", "IEND", "PLTE", "tRNS", "gAMA"];
            var parts = [new Uint32Array([1196314761, 169478669])];
            this.chunks.forEach(function(chunk) {
                if (chunkTypes.indexOf(chunk.name) > -1)
                    parts.push(chunk.getRaw(true))
            });
            return new Blob(parts,{
                type: forDownload ? "application/octet-stream" : "image/png"
            })
        } else
            throw "No file loaded (see fetch())."
    },
    getGammaLUT: function(fileGamma, dispGamma, userGamma) {
        for (var buffer = new Uint8Array(256), gamma = 1 / ((fileGamma || 1) * (dispGamma || 2.2) * (userGamma || 1)), i = 0; i < 256; i++)
            buffer[i] = Math.round(Math.pow(i / 255, gamma) * 255);
        return buffer
    },
    guessDisplayGamma: function() {
        return navigator.userAgent.indexOf("Mac OS") > -1 ? 1.8 : 2.2
    }
};
PngToy._blockSize = 1 << 21;
PngToy._delay = 7;
if (typeof exports !== "undefined")
    exports.PngToy = PngToy;
PngToy._getChunks = function(buffer, view, doCRC, allowInvalid) {
    var me = this, pos = 8, len = buffer.byteLength, chunks = [], chunk, length, fourCC, offset, crc, colorType, plteChunk, trnsChunk, histChunk, offsChunk, sterChunk, isIDAT = true, noConst = ["iTXT", "tIME", "tEXt", "zTXt"], fc = PngToy._findChunk, errNum = "Invalid number of ", errOrd = "Invalid chunk order for ";
    if (doCRC && !this.table) {
        this.table = new Uint32Array(256);
        for (var i = 0, j; i < 256; i++) {
            crc = i >>> 0;
            for (j = 0; j < 8; j++)
                crc = crc & 1 ? 3988292384 ^ crc >>> 1 : crc >>> 1;
            this.table[i] = crc
        }
    }
    while (pos < len) {
        length = getUint32();
        fourCC = getFourCC();
        if (length > 2147483647 && !allowInvalid)
            return {
                error: "Invalid chunk size."
            };
        offset = pos;
        pos = offset + length;
        crc = getUint32();
        chunk = new PngToy.Chunk(fourCC,offset,length,crc,buffer);
        if (doCRC) {
            checkCRC(chunk);
            if (!chunk.crcOk && !allowInvalid)
                return {
                    error: "Invalid CRC in chunk " + fourCC
                }
        }
        if (chunk.isReserved && !allowInvalid)
            return {
                error: "Invalid chunk name: " + fourCC
            };
        chunks.push(chunk)
    }
    if (!allowInvalid) {
        if (!chunksInRange("IHDR", 1, 1))
            return {
                error: errNum + "IHDR chunks."
            };
        if (!chunksInRange("tIME", 0, 1))
            return {
                error: errNum + "tIME chunks."
            };
        if (!chunksInRange("zTXt", 0, -1))
            return {
                error: errNum + "zTXt chunks."
            };
        if (!chunksInRange("tEXt", 0, -1))
            return {
                error: errNum + "tEXt chunks."
            };
        if (!chunksInRange("iTXt", 0, -1))
            return {
                error: errNum + "iTXt chunks."
            };
        if (!chunksInRange("pHYs", 0, 1))
            return {
                error: errNum + "pHYs chunks."
            };
        if (!chunksInRange("sPLT", 0, -1))
            return {
                error: errNum + "sPLT chunks."
            };
        if (!chunksInRange("iCCP", 0, 1))
            return {
                error: errNum + "iCCP chunks."
            };
        if (!chunksInRange("sRGB", 0, 1))
            return {
                error: errNum + "sRGB chunks."
            };
        if (!chunksInRange("sBIT", 0, 1))
            return {
                error: errNum + "sBIT chunks."
            };
        if (!chunksInRange("gAMA", 0, 1))
            return {
                error: errNum + "gAMA chunks."
            };
        if (!chunksInRange("cHRM", 0, 1))
            return {
                error: errNum + "cHRM chunks."
            };
        if (!chunksInRange("PLTE", 0, 1))
            return {
                error: errNum + "PLTE chunks."
            };
        if (!chunksInRange("tRNS", 0, 1))
            return {
                error: errNum + "tRNS chunks."
            };
        if (!chunksInRange("hIST", 0, 1))
            return {
                error: errNum + "hIST chunks."
            };
        if (!chunksInRange("bKGD", 0, 1))
            return {
                error: errNum + "bKGD chunks."
            };
        if (!chunksInRange("IDAT", 1, -1))
            return {
                error: errNum + "IDAT chunks."
            };
        if (!chunksInRange("IEND", 1, 1))
            return {
                error: errNum + "IEND chunks."
            };
        if (chunks[0].name !== "IHDR" || chunks[chunks.length - 1].name !== "IEND")
            return {
                error: "Invalid PNG chunk order."
            };
        colorType = view.getUint8(fc(chunks, "IHDR").offset + 9);
        plteChunk = fc(chunks, "PLTE");
        histChunk = fc(chunks, "hIST");
        trnsChunk = fc(chunks, "tRNS");
        offsChunk = fc(chunks, "oFFs");
        sterChunk = fc(chunks, "sTER");
        if (fc(chunks, "iCCP") && fc(chunks, "sRGB"))
            return {
                error: "Both iCCP and sRGB cannot be present."
            };
        if (colorType === 3 && !plteChunk)
            return {
                error: "Missing PLTE chunk."
            };
        if ((colorType === 0 || colorType === 4) && plteChunk)
            return {
                error: "PLTE chunk should not appear with this color type."
            };
        if ((colorType === 4 || colorType === 6) && trnsChunk)
            return {
                error: "tRNS chunk should not appear with this color type."
            };
        if (histChunk && !plteChunk)
            return {
                error: "hIST chunk can only appear if a PLTE chunk is present."
            };
        if (plteChunk) {
            if (!isBefore("PLTE", "IDAT"))
                return {
                    error: errOrd + "PLTE."
                };
            if (histChunk && !isBetween("PLTE", "hIST", "IDAT"))
                return {
                    error: errOrd + "hIST."
                };
            if (trnsChunk && !isBetween("PLTE", "tRNS", "IDAT"))
                return {
                    error: errOrd + "tRNS."
                };
            if (fc(chunks, "bKGD") && !isBetween("PLTE", "bKGD", "IDAT"))
                return {
                    error: errOrd + "bKGD."
                };
            if (!isBefore("cHRM", "PLTE"))
                return {
                    error: errOrd + "cHRM."
                };
            if (!isBefore("gAMA", "PLTE"))
                return {
                    error: errOrd + "gAMA."
                };
            if (!isBefore("iCCP", "PLTE"))
                return {
                    error: errOrd + "iCCP."
                };
            if (!isBefore("sRGB", "PLTE"))
                return {
                    error: errOrd + "sRGB."
                }
        }
        if (offsChunk && !isBefore("oFFs", "IDAT"))
            return {
                error: errOrd + "oFFs."
            };
        if (sterChunk && !isBefore("sTER", "IDAT"))
            return {
                error: errOrd + "sTER."
            };
        for (i = chunks.length - 2; i > 0; i--) {
            if (isIDAT && chunks[i].name !== "IDAT" && noConst.indexOf(chunks[i].name) < 0) {
                isIDAT = false
            } else if (!isIDAT && chunks[i].name === "IDAT") {
                return {
                    error: "Invalid chunk inside IDAT chunk sequence."
                }
            }
        }
    }
    return {
        chunks: chunks
    };
    function chunksInRange(chunk, min, max) {
        var lst = PngToy._findChunks(chunks, chunk);
        return max < 0 ? lst.length >= min : lst.length >= min && lst.length <= max
    }
    function isBetween(beforeChunk, chunk, afterChunk) {
        return isBefore(beforeChunk, chunk) && isBefore(chunk, afterChunk)
    }
    function isBefore(beforeChunk, chunk) {
        var bi = -1, ci = -1, i, l = chunks.length;
        for (i = 0; i < l; i++) {
            if (chunks[i].name === beforeChunk)
                bi = i;
            if (chunks[i].name === chunk)
                ci = i
        }
        return bi < ci
    }
    function checkCRC(chunk) {
        var crcBuffer = new Uint8Array(buffer,chunk.offset - 4,chunk.length + 4);
        chunk.crcOk = chunk.crc === calcCRC(crcBuffer);
        function calcCRC(buffer) {
            var crc = -1 >>> 0, len = buffer.length, i;
            for (i = 0; i < len; i++)
                crc = crc >>> 8 ^ me.table[(crc ^ buffer[i]) & 255];
            return (crc ^ -1) >>> 0
        }
    }
    function getFourCC() {
        var v = getUint32()
          , c = String.fromCharCode;
        return c(v >>> 24) + c(v >> 16 & 255) + c(v >> 8 & 255) + c(v & 255)
    }
    function getUint32() {
        var i = view.getUint32(pos);
        pos += 4;
        return i >>> 0
    }
}
;
PngToy._getChunks.table = null;
PngToy._findChunk = function(chunks, name) {
    for (var i = 0, chunk; chunk = chunks[i++]; ) {
        if (chunk.name === name)
            return chunk
    }
    return null
}
;
PngToy._findChunks = function(chunks, name) {
    var lst = [];
    chunks.forEach(function(chunk) {
        if (chunk.name === name)
            lst.push(chunk)
    });
    return lst
}
;
PngToy._getStr = function(view, offset, max) {
    var text = "", i = offset, ch = -1, v, warn = false, getChar = String.fromCharCode, san = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"%&'()*+,-./:;<=>?_";
    max += i;
    for (; i < max && ch; ) {
        ch = view.getUint8(i++);
        if (ch) {
            v = getChar(ch);
            if (san.indexOf(v) > -1)
                text += v;
            else
                warn = true;
            continue
        }
        break
    }
    return {
        offset: i,
        text: text,
        warning: warn
    }
}
;
PngToy.Chunk = function(name, offset, length, crc, buffer) {
    this.name = name;
    this.offset = offset;
    this.length = length;
    this.crc = crc;
    this.crcOk = true;
    this.isCritical = !(name.charCodeAt(0) & 32);
    this.isPrivate = !!(name.charCodeAt(1) & 32);
    this.isReserved = !!(name.charCodeAt(2) & 32);
    this.isCopySafe = !!(name.charCodeAt(3) & 32);
    this.buffer = buffer
}
;
PngToy.Chunk.prototype = {
    getRaw: function(includeContainer) {
        return includeContainer ? new Uint8Array(this.buffer,this.offset - 8,this.length + 12) : new Uint8Array(this.buffer,this.offset,this.length)
    }
};
PngToy._bKGD = function(host) {
    var view = host.view
      , chunks = host.chunks
      , chunk = PngToy._findChunk(chunks, "bKGD")
      , ihdr = PngToy._IHDR(host);
    if (!chunk)
        return null;
    switch (ihdr.type) {
    case 0:
    case 4:
        return {
            background: [view.getUint16(chunk.offset)]
        };
    case 2:
    case 6:
        return {
            background: new Uint16Array(view.buffer,chunk.offset,6)
        };
    default:
        return {
            index: view.getUint8(chunk.offset)
        }
    }
}
;
PngToy._cHRM = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "cHRM"), result, pos;
    if (!chunk)
        return null;
    pos = chunk.offset;
    result = {
        whiteX: view.getUint32(pos) / 1e5,
        whiteY: view.getUint32(pos + 4) / 1e5,
        redX: view.getUint32(pos + 8) / 1e5,
        redY: view.getUint32(pos + 12) / 1e5,
        greenX: view.getUint32(pos + 16) / 1e5,
        greenY: view.getUint32(pos + 20) / 1e5,
        blueX: view.getUint32(pos + 24) / 1e5,
        blueY: view.getUint32(pos + 28) / 1e5
    };
    if (!allowInvalid) {}
    return result
}
;
PngToy._oFFs = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "oFFs"), pos, result = {};
    if (!chunk)
        return null;
    pos = chunk.offset;
    result.x = view.getInt32(pos);
    result.y = view.getInt32(pos + 4);
    result.unit = view.getUint8(pos + 8);
    result.desc = ["Pixels", "Micrometers"][result.unit] || "Invalid";
    if (!allowInvalid) {
        if (result.unit < 0 || result.unit > 1)
            return {
                error: "Invalid unit for oFFs chunk."
            }
    }
    return result
}
;
PngToy._pCAL = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "pCAL"), warn = false, pos, o, result = {}, params = [], i = 0, len;
    if (!chunk.length)
        return null;
    pos = chunk.offset;
    o = PngToy._getStr(view, pos, 80);
    result.calName = o.text;
    pos = o.offset;
    if (o.warn)
        warn = true;
    result.x0 = view.getInt32(pos);
    result.x1 = view.getInt32(pos + 4);
    result.eqType = view.getUint8(pos + 8);
    result.eqDesc = ["Linear mapping", "Base-e exponential mapping", "Arbitrary-base exponential mapping", "Hyperbolic mapping"][result.eqType] || null;
    result.paramCount = view.getUint8(pos + 9);
    pos += 10;
    o = PngToy._getStr(view, pos, 1e4);
    result.unitName = o.text;
    pos = o.offset;
    if (o.warn)
        warn = true;
    len = result.paramCount - 1;
    for (; i < len; i++) {
        o = PngToy._getStr(view, pos, 1e4);
        params.push(o.text);
        pos = o.offset;
        if (o.warn)
            warn = true
    }
    o = PngToy._getStr(view, pos, chunk.length - (pos - chunk.offset));
    params.push(o.text);
    if (o.warn)
        warn = true;
    result.parameters = params;
    if (!allowInvalid) {
        if (result.x0 === result.x1)
            return {
                error: "Invalid x0 or x1."
            };
        if (params.length !== result.paramCount)
            return {
                error: "Mismatching parameter count and number of parameters."
            };
        if (result.eqType < 0 || result.eqType > 3)
            return {
                error: "Invalid equation type."
            };
        if (warn)
            return {
                error: "One or more text field contains illegal chars."
            }
    }
    return result
}
;
PngToy._sCAL = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "sCAL"), pos, o, result = {};
    if (!chunk.length)
        return null;
    pos = chunk.offset;
    result.unit = view.getUint8(pos++);
    result.desc = ["meters", "radians"][result.unit] || null;
    o = PngToy._getStr(view, pos, 1e5);
    result.unitsX = o.text;
    pos = o.offset;
    o = PngToy._getStr(view, pos, chunk.length - (pos - chunk.offset));
    result.unitsY = o.text;
    if (!allowInvalid) {
        if (result.unit < 1 || result.unit > 2)
            return {
                error: "Invalid unit"
            }
    }
    return result
}
;
PngToy._sTER = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "sTER"), pos, result = {};
    if (!chunk)
        return null;
    pos = chunk.offset;
    result.mode = view.getUint8(pos);
    result.desc = ["Cross-fuse layout", "Diverging-fuse layout"][result.mode];
    if (!allowInvalid) {
        if (result.mode < 0 || result.mode > 1)
            return {
                error: "Invalid mode for sTER chunk."
            }
    }
    return result
}
;
PngToy._gAMA = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "gAMA"), gamma;
    if (!chunk)
        return null;
    gamma = view.getUint32(chunk.offset) / 1e5;
    if (!allowInvalid) {}
    return {
        gamma: gamma
    }
}
;
PngToy._hIST = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "hIST"), plte = PngToy._PLTE(host), hist = [], pos, max;
    if (!chunk)
        return null;
    if (!allowInvalid && chunk.length % 2)
        return {
            error: "Invalid length of hIST chunk."
        };
    pos = chunk.offset;
    max = pos + chunk.length;
    for (; pos < max; pos += 2)
        hist.push(view.getUint16(pos));
    if (!allowInvalid) {
        if (hist.length !== plte.length)
            return {
                error: "hIST chunk must have same number of entries as PLTE chunk."
            }
    }
    return {
        histogram: hist
    }
}
;
PngToy._IHDR = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "IHDR"), pos, result;
    if (!chunk)
        return {
            error: "Critical - IHDR chunk is missing."
        };
    pos = chunk.offset;
    result = {
        width: view.getUint32(pos),
        height: view.getUint32(pos + 4),
        depth: view.getUint8(pos + 8),
        type: view.getUint8(pos + 9),
        compression: view.getUint8(pos + 10),
        filter: view.getUint8(pos + 11),
        interlaced: view.getUint8(pos + 12)
    };
    if (!allowInvalid) {
        if ([0, 2, 3, 4, 6].indexOf(result.type) < 0)
            return {
                error: "Invalid color type."
            };
        switch (result.type) {
        case 0:
            if ([1, 2, 4, 8, 16].indexOf(result.depth) < 0)
                return {
                    error: "Invalid color depth."
                };
            break;
        case 3:
            if ([1, 2, 4, 8].indexOf(result.depth) < 0)
                return {
                    error: "Invalid color depth."
                };
            break;
        default:
            if ([8, 16].indexOf(result.depth) < 0)
                return {
                    error: "Invalid color depth."
                }
        }
        if (!result.width || !result.height)
            return {
                error: "Invalid dimension."
            };
        if (result.compression)
            return {
                error: "Invalid compression type."
            };
        if (result.filter)
            return {
                error: "Invalid filter type."
            };
        if (result.interlaced < 0 || result.interlaced > 1)
            return {
                error: "Invalid interlace mode " + result.interlaced
            }
    }
    return result
}
;
PngToy._pHYs = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "pHYs"), pos, result = {};
    if (!chunk)
        return null;
    pos = chunk.offset;
    result.ppuX = view.getUint32(pos);
    result.ppuY = view.getUint32(pos + 4);
    result.unit = view.getUint8(pos + 8);
    if (result.unit === 1) {
        result.desc = "Meters"
    } else {
        result.desc = "ratio"
    }
    if (!allowInvalid) {
        if (result.ppuX > 2147483647 || result.ppuY > 2147483647)
            return {
                error: "Invalid unit lengths."
            };
        if (result.unit < 0 || result.unit > 1)
            return {
                error: "Invalid unit for pHYs chunk."
            }
    } else {
        result.ppuX &= 2147483647;
        result.ppuY &= 2147483647;
        result.unit &= 1
    }
    return result
}
;
PngToy._PLTE = function(host) {
    var buffer = host.buffer, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "PLTE"), palette;
    if (!chunk)
        return null;
    palette = new Uint8Array(buffer,chunk.offset,chunk.length);
    if (!allowInvalid) {
        if (palette.length % 3)
            return {
                error: "Invalid palette size."
            };
        if (palette.length < 3 || palette.length > 3 * 256)
            return {
                error: "Invalid number of palette entries."
            }
    }
    return {
        palette: palette,
        length: palette.length / 3
    }
}
;
PngToy._sBIT = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "sBIT"), ihdr = PngToy._IHDR(host), pos, depth, hasError = false, result = {
        grey: null,
        alpha: null,
        red: null,
        green: null,
        blue: null
    };
    if (!chunk)
        return null;
    pos = chunk.offset;
    depth = ihdr.type === 3 ? 8 : ihdr.depth;
    switch (ihdr.type) {
    case 0:
        result.grey = view.getUint8(pos);
        break;
    case 2:
    case 3:
        result.red = view.getUint8(pos++);
        result.green = view.getUint8(pos++);
        result.blue = view.getUint8(pos);
        break;
    case 4:
        result.grey = view.getUint8(pos++);
        result.alpha = view.getUint8(pos);
        break;
    case 6:
        result.red = view.getUint8(pos++);
        result.green = view.getUint8(pos++);
        result.blue = view.getUint8(pos++);
        result.alpha = view.getUint8(pos);
        break
    }
    if (!allowInvalid) {
        if (null !== result.red)
            if (result.red > depth || result.red === 0)
                hasError = true;
        if (null !== result.green)
            if (result.green > depth || result.green === 0)
                hasError = true;
        if (null !== result.blue)
            if (result.blue > depth || result.blue === 0)
                hasError = true;
        if (null !== result.grey)
            if (result.grey > depth || result.grey === 0)
                hasError = true;
        if (null !== result.alpha)
            if (result.alpha > depth || result.alpha === 0)
                hasError = true;
        if (hasError)
            return {
                error: "Invalid sBIT chunk."
            }
    }
    return result
}
;
PngToy._sPLT = function(host) {
    var view = host.view
      , chunks = host.chunks
      , allowInvalid = host.allowInvalid
      , chunkLst = PngToy._findChunks(chunks, "sPLT")
      , lst = [];
    if (!chunkLst.length)
        return null;
    chunkLst.forEach(function(chunk) {
        var result = {
            depth: null,
            name: null,
            palette: [],
            entries: 0
        }, nameO, pos, len, width, b, palette = [], i, func;
        pos = chunk.offset;
        nameO = PngToy._getStr(view, pos, 80);
        result.name = nameO.text;
        pos = nameO.offset;
        result.depth = view.getUint8(pos++);
        width = result.depth === 8 ? 6 : 10;
        b = result.depth === 8 ? 1 : 2;
        len = chunk.length - (pos - chunk.offset);
        func = width === 6 ? view.getUint8.bind(view) : view.getUint16.bind(view);
        for (i = 0; i < len; i += width) {
            palette.push(func(pos + i), func(pos + i + b), func(pos + i + b * 2), func(pos + i + b * 3), view.getUint16(pos + i + b * 4))
        }
        result.palette = palette;
        result.entries = palette.length / width;
        if (!allowInvalid) {
            if (result.depth === 8 && len % 6 || result.depth === 16 && len % 10)
                return {
                    error: "Invalid sPLT chunk."
                }
        }
        lst.push(result)
    });
    return lst
}
;
PngToy._sRGB = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "sRGB"), intent, intents = ["Perceptual", "Relative colorimetric", "Saturation", "Absolute colorimetric"];
    if (!chunk)
        return null;
    intent = view.getUint8(chunk.offset);
    if (!allowInvalid) {
        if (intent < 0 || intent > 3)
            return {
                error: "Invalid range for sRGB render intent."
            }
    }
    return {
        intent: intent,
        desc: intents[intent] || null
    }
}
;
PngToy._tEXt = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunkLst = PngToy._findChunks(chunks, "tEXt"), warn = false, abort = false, pos, txtBuff, o, i, lst = [];
    if (!chunkLst.length)
        return null;
    chunkLst.forEach(function(chunk) {
        if (abort)
            return;
        var result = {};
        pos = chunk.offset;
        o = PngToy._getStr(view, pos, 80);
        result.keyword = o.text;
        pos = o.offset;
        if (o.warn)
            warn = true;
        txtBuff = new Uint8Array(view.buffer,pos,chunk.length - (pos - chunk.offset));
        o = "";
        for (i = 0; i < txtBuff.length; i++)
            o += String.fromCharCode(txtBuff[i]);
        result.text = o;
        lst.push(result);
        if (!allowInvalid && warn) {
            abort = true;
            return {
                error: "One or more field contains illegal chars."
            }
        }
    });
    return lst
}
;
PngToy._tIME = function(host) {
    var view = host.view, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "tIME"), pos, result;
    if (!chunk)
        return null;
    pos = chunk.offset;
    result = {
        year: view.getUint16(pos),
        month: view.getUint8(pos + 2),
        day: view.getUint8(pos + 3),
        hour: view.getUint8(pos + 4),
        minute: view.getUint8(pos + 5),
        second: view.getUint8(pos + 6),
        date: null
    };
    if (!allowInvalid) {
        if (result.year < 0 || result.year > 65535 || result.month < 1 || result.month > 12 || result.day < 1 || result.day > 31 || result.hour < 0 || result.hour > 23 || result.minute < 0 || result.minute > 59 || result.second < 0 || result.second > 60)
            return {
                error: "Invalid timestamp."
            }
    }
    try {
        result.date = new Date(result.year,result.month - 1,result.day,result.hour,result.minute,Math.min(59, result.second))
    } catch (err) {
        if (!allowInvalid)
            return {
                error: err
            }
    }
    return result
}
;
PngToy._tRNS = function(host) {
    var buffer = host.buffer, chunks = host.chunks, allowInvalid = host.allowInvalid, chunk = PngToy._findChunk(chunks, "tRNS"), plte = PngToy._PLTE(host), ihdr = PngToy._IHDR(host), trans;
    if (!chunk)
        return null;
    if (!allowInvalid) {
        if (ihdr.type === 2 && chunk.length % 6)
            return {
                error: "Invalid tRNS length."
            }
    }
    switch (ihdr.type) {
    case 0:
        trans = {
            alphas: new Uint16Array(buffer.slice(chunk.offset, chunk.offset + chunk.length)),
            length: chunk.length >> 1
        };
        break;
    case 2:
        trans = {
            alphas: new Uint16Array(buffer.slice(chunk.offset, chunk.offset + chunk.length)),
            length: chunk.length / 6
        };
        break;
    case 3:
        trans = {
            alphas: new Uint8Array(buffer,chunk.offset,chunk.length),
            length: chunk.length
        };
        break;
    default:
        return allowInvalid ? {
            alphas: null,
            length: 0
        } : {
            error: "tRNS chunk is not valid for this color type."
        }
    }
    if (!allowInvalid && plte && trans.length > plte.length)
        return {
            error: "tRNS chunk contains more entries than palette entries."
        };
    return trans
}
;
PngToy.prototype.fetchDataURL = function(i) {
    var d = this;
    return d.url = i,
    d.buffer = d.chunks = d.view = null,
    d._pos = 0,
    new Promise(function(t, e) {
        try {
            for (var a = new ArrayBuffer(i.length), n = new Uint8Array(a), r = 0, s = i.length; r < s; r++)
                n[r] = i.charCodeAt(r);
            var c, o = new DataView(a);
            2303741511 === o.getUint32(0) && 218765834 === o.getUint32(4) ? (d.buffer = o.buffer,
            d.view = o,
            c = PngToy._getChunks(d.buffer, d.view, d.doCRC, d.allowInvalid),
            d.chunks = c.chunks || null,
            d.chunks || d.allowInvalid ? t() : e(c.error)) : e("Not a PNG file.")
        } catch (l) {
            e(l.message)
        }
    }
    )
};

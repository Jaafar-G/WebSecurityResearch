!function(e) {
        var t = {};
        function n(r) {
                if (t[r])
                        return t[r].exports;
                var o = t[r] = {
                        i: r,
                        l: !1,
                        exports: {}
                };
                return e[r].call(o.exports, o, o.exports, n),
                o.l = !0,
                o.exports
        }
        n.m = e,
        n.c = t,
        n.d = function(e, t, r) {
                n.o(e, t) || Object.defineProperty(e, t, {
                        enumerable: !0,
                        get: r
                })
        }
        ,
        n.r = function(e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                }),
                Object.defineProperty(e, "__esModule", {
                        value: !0
                })
        }
        ,
        n.t = function(e, t) {
                if (1 & t && (e = n(e)),
                8 & t)
                        return e;
                if (4 & t && "object" == typeof e && e && e.__esModule)
                        return e;
                var r = Object.create(null);
                if (n.r(r),
                Object.defineProperty(r, "default", {
                        enumerable: !0,
                        value: e
                }),
                2 & t && "string" != typeof e)
                        for (var o in e)
                                n.d(r, o, function(t) {
                                        return e[t]
                                }
                                .bind(null, o));
                return r
        }
        ,
        n.n = function(e) {
                var t = e && e.__esModule ? function() {
                        return e.default
                }
                : function() {
                        return e
                }
                ;
                return n.d(t, "a", t),
                t
        }
        ,
        n.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 10)
}([function(e, t) {
        function n(e) {
                return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                }
                : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                )(e)
        }
        var r;
        r = function() {
                return this
        }();
        try {
                r = r || new Function("return this")()
        } catch (e) {
                "object" === ("undefined" == typeof window ? "undefined" : n(window)) && (r = window)
        }
        e.exports = r
}
, function(e, t, n) {
        "use strict";
        (function(e) {
                var r = n(2);
                function o(e) {
                        return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                return typeof e
                        }
                        : function(e) {
                                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        }
                        )(e)
                }
                var i = setTimeout;
                function a(e) {
                        return Boolean(e && void 0 !== e.length)
                }
                function c() {}
                function u(e) {
                        if (!(this instanceof u))
                                throw new TypeError("Promises must be constructed via new");
                        if ("function" != typeof e)
                                throw new TypeError("not a function");
                        this._state = 0,
                        this._handled = !1,
                        this._value = void 0,
                        this._deferreds = [],
                        h(e, this)
                }
                function s(e, t) {
                        for (; 3 === e._state; )
                                e = e._value;
                        0 !== e._state ? (e._handled = !0,
                        u._immediateFn(function() {
                                var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                                if (null !== n) {
                                        var r;
                                        try {
                                                r = n(e._value)
                                        } catch (e) {
                                                return void f(t.promise, e)
                                        }
                                        l(t.promise, r)
                                } else
                                        (1 === e._state ? l : f)(t.promise, e._value)
                        })) : e._deferreds.push(t)
                }
                function l(e, t) {
                        try {
                                if (t === e)
                                        throw new TypeError("A promise cannot be resolved with itself.");
                                if (t && ("object" === o(t) || "function" == typeof t)) {
                                        var n = t.then;
                                        if (t instanceof u)
                                                return e._state = 3,
                                                e._value = t,
                                                void d(e);
                                        if ("function" == typeof n)
                                                return void h((r = n,
                                                i = t,
                                                function() {
                                                        r.apply(i, arguments)
                                                }
                                                ), e)
                                }
                                e._state = 1,
                                e._value = t,
                                d(e)
                        } catch (t) {
                                f(e, t)
                        }
                        var r, i
                }
                function f(e, t) {
                        e._state = 2,
                        e._value = t,
                        d(e)
                }
                function d(e) {
                        2 === e._state && 0 === e._deferreds.length && u._immediateFn(function() {
                                e._handled || u._unhandledRejectionFn(e._value)
                        });
                        for (var t = 0, n = e._deferreds.length; t < n; t++)
                                s(e, e._deferreds[t]);
                        e._deferreds = null
                }
                function p(e, t, n) {
                        this.onFulfilled = "function" == typeof e ? e : null,
                        this.onRejected = "function" == typeof t ? t : null,
                        this.promise = n
                }
                function h(e, t) {
                        var n = !1;
                        try {
                                e(function(e) {
                                        n || (n = !0,
                                        l(t, e))
                                }, function(e) {
                                        n || (n = !0,
                                        f(t, e))
                                })
                        } catch (e) {
                                if (n)
                                        return;
                                n = !0,
                                f(t, e)
                        }
                }
                u.prototype.catch = function(e) {
                        return this.then(null, e)
                }
                ,
                u.prototype.then = function(e, t) {
                        var n = new this.constructor(c);
                        return s(this, new p(e,t,n)),
                        n
                }
                ,
                u.prototype.finally = r.a,
                u.all = function(e) {
                        return new u(function(t, n) {
                                if (!a(e))
                                        return n(new TypeError("Promise.all accepts an array"));
                                var r = Array.prototype.slice.call(e);
                                if (0 === r.length)
                                        return t([]);
                                var i = r.length;
                                function c(e, a) {
                                        try {
                                                if (a && ("object" === o(a) || "function" == typeof a)) {
                                                        var u = a.then;
                                                        if ("function" == typeof u)
                                                                return void u.call(a, function(t) {
                                                                        c(e, t)
                                                                }, n)
                                                }
                                                r[e] = a,
                                                0 == --i && t(r)
                                        } catch (e) {
                                                n(e)
                                        }
                                }
                                for (var u = 0; u < r.length; u++)
                                        c(u, r[u])
                        }
                        )
                }
                ,
                u.resolve = function(e) {
                        return e && "object" === o(e) && e.constructor === u ? e : new u(function(t) {
                                t(e)
                        }
                        )
                }
                ,
                u.reject = function(e) {
                        return new u(function(t, n) {
                                n(e)
                        }
                        )
                }
                ,
                u.race = function(e) {
                        return new u(function(t, n) {
                                if (!a(e))
                                        return n(new TypeError("Promise.race accepts an array"));
                                for (var r = 0, o = e.length; r < o; r++)
                                        u.resolve(e[r]).then(t, n)
                        }
                        )
                }
                ,
                u._immediateFn = "function" == typeof e && function(t) {
                        e(t)
                }
                || function(e) {
                        i(e, 0)
                }
                ,
                u._unhandledRejectionFn = function(e) {
                        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
                }
                ,
                t.a = u
        }
        ).call(this, n(3).setImmediate)
}
, function(e, t, n) {
        "use strict";
        t.a = function(e) {
                var t = this.constructor;
                return this.then(function(n) {
                        return t.resolve(e()).then(function() {
                                return n
                        })
                }, function(n) {
                        return t.resolve(e()).then(function() {
                                return t.reject(n)
                        })
                })
        }
}
, function(e, t, n) {
        (function(e) {
                var r = void 0 !== e && e || "undefined" != typeof self && self || window
                    , o = Function.prototype.apply;
                function i(e, t) {
                        this._id = e,
                        this._clearFn = t
                }
                t.setTimeout = function() {
                        return new i(o.call(setTimeout, r, arguments),clearTimeout)
                }
                ,
                t.setInterval = function() {
                        return new i(o.call(setInterval, r, arguments),clearInterval)
                }
                ,
                t.clearTimeout = t.clearInterval = function(e) {
                        e && e.close()
                }
                ,
                i.prototype.unref = i.prototype.ref = function() {}
                ,
                i.prototype.close = function() {
                        this._clearFn.call(r, this._id)
                }
                ,
                t.enroll = function(e, t) {
                        clearTimeout(e._idleTimeoutId),
                        e._idleTimeout = t
                }
                ,
                t.unenroll = function(e) {
                        clearTimeout(e._idleTimeoutId),
                        e._idleTimeout = -1
                }
                ,
                t._unrefActive = t.active = function(e) {
                        clearTimeout(e._idleTimeoutId);
                        var t = e._idleTimeout;
                        t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                                e._onTimeout && e._onTimeout()
                        }, t))
                }
                ,
                n(4),
                t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate,
                t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
        }
        ).call(this, n(0))
}
, function(e, t, n) {
        (function(e, t) {
                !function(e, n) {
                        "use strict";
                        if (!e.setImmediate) {
                                var r, o, i, a, c, u = 1, s = {}, l = !1, f = e.document, d = Object.getPrototypeOf && Object.getPrototypeOf(e);
                                d = d && d.setTimeout ? d : e,
                                "[object process]" === {}.toString.call(e.process) ? r = function(e) {
                                        t.nextTick(function() {
                                                h(e)
                                        })
                                }
                                : !function() {
                                        if (e.postMessage && !e.importScripts) {
                                                var t = !0
                                                    , n = e.onmessage;
                                                return e.onmessage = function() {
                                                        t = !1
                                                }
                                                ,
                                                e.postMessage("", "*"),
                                                e.onmessage = n,
                                                t
                                        }
                                }() ? e.MessageChannel ? ((i = new MessageChannel).port1.onmessage = function(e) {
                                        h(e.data)
                                }
                                ,
                                r = function(e) {
                                        i.port2.postMessage(e)
                                }
                                ) : f && "onreadystatechange"in f.createElement("script") ? (o = f.documentElement,
                                r = function(e) {
                                        var t = f.createElement("script");
                                        t.onreadystatechange = function() {
                                                h(e),
                                                t.onreadystatechange = null,
                                                o.removeChild(t),
                                                t = null
                                        }
                                        ,
                                        o.appendChild(t)
                                }
                                ) : r = function(e) {
                                        setTimeout(h, 0, e)
                                }
                                : (a = "setImmediate$" + Math.random() + "$",
                                c = function(t) {
                                        t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(a) && h(+t.data.slice(a.length))
                                }
                                ,
                                e.addEventListener ? e.addEventListener("message", c, !1) : e.attachEvent("onmessage", c),
                                r = function(t) {
                                        e.postMessage(a + t, "*")
                                }
                                ),
                                d.setImmediate = function(e) {
                                        "function" != typeof e && (e = new Function("" + e));
                                        for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++)
                                                t[n] = arguments[n + 1];
                                        var o = {
                                                callback: e,
                                                args: t
                                        };
                                        return s[u] = o,
                                        r(u),
                                        u++
                                }
                                ,
                                d.clearImmediate = p
                        }
                        function p(e) {
                                delete s[e]
                        }
                        function h(e) {
                                if (l)
                                        setTimeout(h, 0, e);
                                else {
                                        var t = s[e];
                                        if (t) {
                                                l = !0;
                                                try {
                                                        !function(e) {
                                                                var t = e.callback
                                                                    , r = e.args;
                                                                switch (r.length) {
                                                                case 0:
                                                                        t();
                                                                        break;
                                                                case 1:
                                                                        t(r[0]);
                                                                        break;
                                                                case 2:
                                                                        t(r[0], r[1]);
                                                                        break;
                                                                case 3:
                                                                        t(r[0], r[1], r[2]);
                                                                        break;
                                                                default:
                                                                        t.apply(n, r)
                                                                }
                                                        }(t)
                                                } finally {
                                                        p(e),
                                                        l = !1
                                                }
                                        }
                                }
                        }
                }("undefined" == typeof self ? void 0 === e ? this : e : self)
        }
        ).call(this, n(0), n(5))
}
, function(e, t) {
        var n, r, o = e.exports = {};
        function i() {
                throw new Error("setTimeout has not been defined")
        }
        function a() {
                throw new Error("clearTimeout has not been defined")
        }
        function c(e) {
                if (n === setTimeout)
                        return setTimeout(e, 0);
                if ((n === i || !n) && setTimeout)
                        return n = setTimeout,
                        setTimeout(e, 0);
                try {
                        return n(e, 0)
                } catch (t) {
                        try {
                                return n.call(null, e, 0)
                        } catch (t) {
                                return n.call(this, e, 0)
                        }
                }
        }
        !function() {
                try {
                        n = "function" == typeof setTimeout ? setTimeout : i
                } catch (e) {
                        n = i
                }
                try {
                        r = "function" == typeof clearTimeout ? clearTimeout : a
                } catch (e) {
                        r = a
                }
        }();
        var u, s = [], l = !1, f = -1;
        function d() {
                l && u && (l = !1,
                u.length ? s = u.concat(s) : f = -1,
                s.length && p())
        }
        function p() {
                if (!l) {
                        var e = c(d);
                        l = !0;
                        for (var t = s.length; t; ) {
                                for (u = s,
                                s = []; ++f < t; )
                                        u && u[f].run();
                                f = -1,
                                t = s.length
                        }
                        u = null,
                        l = !1,
                        function(e) {
                                if (r === clearTimeout)
                                        return clearTimeout(e);
                                if ((r === a || !r) && clearTimeout)
                                        return r = clearTimeout,
                                        clearTimeout(e);
                                try {
                                        r(e)
                                } catch (t) {
                                        try {
                                                return r.call(null, e)
                                        } catch (t) {
                                                return r.call(this, e)
                                        }
                                }
                        }(e)
                }
        }
        function h(e, t) {
                this.fun = e,
                this.array = t
        }
        function m() {}
        o.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                        for (var n = 1; n < arguments.length; n++)
                                t[n - 1] = arguments[n];
                s.push(new h(e,t)),
                1 !== s.length || l || c(p)
        }
        ,
        h.prototype.run = function() {
                this.fun.apply(null, this.array)
        }
        ,
        o.title = "browser",
        o.browser = !0,
        o.env = {},
        o.argv = [],
        o.version = "",
        o.versions = {},
        o.on = m,
        o.addListener = m,
        o.once = m,
        o.off = m,
        o.removeListener = m,
        o.removeAllListeners = m,
        o.emit = m,
        o.prependListener = m,
        o.prependOnceListener = m,
        o.listeners = function(e) {
                return []
        }
        ,
        o.binding = function(e) {
                throw new Error("process.binding is not supported")
        }
        ,
        o.cwd = function() {
                return "/"
        }
        ,
        o.chdir = function(e) {
                throw new Error("process.chdir is not supported")
        }
        ,
        o.umask = function() {
                return 0
        }
}
, function(e, t) {
        var n = "".concat(80.2, "-").concat(1);
        e.exports = {
                ItVersions: {
                        serverJs: 80.2,
                        pnTag: "".concat(80.2, "-").concat(1),
                        pnWorker: "".concat(80.2, "-").concat(1),
                        popWar: 7.2,
                        css: n,
                        uiTag: "".concat(80.2, "-").concat(1),
                        diTag: "".concat(80.2, "-").concat(1),
                        pop: "".concat(80.2, "-").concat(1),
                        footer: "".concat(80.2, "-").concat(1),
                        bounce: "".concat(80.2, "-").concat(1),
                        mobileRedir: "".concat(80.2, "-").concat(1),
                        mobileDialog: "".concat(80.2, "-").concat(1),
                        mobileNotify: "".concat(80.2, "-").concat(1),
                        d2sTag: "".concat(80.2, "-").concat(1),
                        d2sTagDfp: "".concat(80.2, "-").concat(1),
                        storageSrv: "".concat(80.2, "-").concat(1)
                }
        }
}
, function(e, t) {
        /*! https://mths.be/includes v0.2.0 by @mathias */
        String.prototype.includes || function() {
                "use strict";
                var e = {}.toString
                    , t = function() {
                        try {
                                var e = {}
                                    , t = Object.defineProperty
                                    , n = t(e, e, e) && t
                        } catch (e) {}
                        return n
                }()
                    , n = "".indexOf
                    , r = function(t) {
                        if (null == this)
                                throw TypeError();
                        var r = String(this);
                        if (t && "[object RegExp]" == e.call(t))
                                throw TypeError();
                        var o = r.length
                            , i = String(t)
                            , a = i.length
                            , c = arguments.length > 1 ? arguments[1] : void 0
                            , u = c ? Number(c) : 0;
                        return u != u && (u = 0),
                        !(a + Math.min(Math.max(u, 0), o) > o) && -1 != n.call(r, i, u)
                };
                t ? t(String.prototype, "includes", {
                        value: r,
                        configurable: !0,
                        writable: !0
                }) : String.prototype.includes = r
        }()
}
, function(e, t) {
        /*! http://mths.be/startswith v0.2.0 by @mathias */
        String.prototype.startsWith || function() {
                "use strict";
                var e = function() {
                        try {
                                var e = {}
                                    , t = Object.defineProperty
                                    , n = t(e, e, e) && t
                        } catch (e) {}
                        return n
                }()
                    , t = {}.toString
                    , n = function(e) {
                        if (null == this)
                                throw TypeError();
                        var n = String(this);
                        if (e && "[object RegExp]" == t.call(e))
                                throw TypeError();
                        var r = n.length
                            , o = String(e)
                            , i = o.length
                            , a = arguments.length > 1 ? arguments[1] : void 0
                            , c = a ? Number(a) : 0;
                        c != c && (c = 0);
                        var u = Math.min(Math.max(c, 0), r);
                        if (i + u > r)
                                return !1;
                        for (var s = -1; ++s < i; )
                                if (n.charCodeAt(u + s) != o.charCodeAt(s))
                                        return !1;
                        return !0
                };
                e ? e(String.prototype, "startsWith", {
                        value: n,
                        configurable: !0,
                        writable: !0
                }) : String.prototype.startsWith = n
        }()
}
, function(e, t, n) {
        "use strict";
        "function" != typeof Object.assign && (Object.assign = function(e) {
                if (null == e)
                        throw new TypeError("Cannot convert undefined or null to object");
                for (var t = Object(e), n = 1; n < arguments.length; n++) {
                        var r = arguments[n];
                        if (null != r)
                                for (var o in r)
                                        r.hasOwnProperty(o) && (t[o] = r[o])
                }
                return t
        }
        )
}
, function(e, t, n) {
        "use strict";
        n.r(t);
        var r = n(1);
        function o(e, t) {
                for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
        }
        var i, a, c, u, s, l, f = n(6).ItVersions, d = "".concat(f.serverJs), p = function() {
                function e() {
                        !function(e, t) {
                                if (!(e instanceof t))
                                        throw new TypeError("Cannot call a class as a function")
                        }(this, e)
                }
                var t, n, r;
                return t = e,
                r = [{
                        key: "getInstance",
                        value: function() {
                                return window._rhat4 = window._rhat4 || {
                                        f: {},
                                        c: {},
                                        d: {},
                                        adCtx: {}
                                },
                                window._rhat4.c[d] = window._rhat4.c[d] || {},
                                {
                                        f: window._rhat4.f,
                                        c: window._rhat4.c[d],
                                        d: window._rhat4.d,
                                        adCtx: window._rhat4.adCtx
                                }
                        }
                }],
                (n = null) && o(t.prototype, n),
                r && o(t, r),
                e
        }(), h = (a = function(e) {
                return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)
        }
        ,
        c = function(e) {
                return /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e)
        }
        ,
        u = function(e) {
                return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)
        }
        ,
        s = "".concat((navigator.userAgent || navigator.vendor || window.opera).toLowerCase()),
        (l = {
                bot: /bot|googlebot|crawler|spider|robot|crawling/i.test(s),
                webkit: /webkit/.test(s),
                mozilla: /mozilla/.test(s) && !/(compatible|webkit)/.test(s),
                chrome: /chrome/.test(s) && !/(opera|opr|edge)/.test(s),
                edge: /edge/.test(s),
                msie: (/msie/.test(s) || /trident/.test(s) || !!window.MSStream) && !/opera/.test(s),
                firefox: /firefox/.test(s),
                safari: /safari/.test(s) && !/chrome/.test(s),
                opera: (/opera/.test(s) || /opr/.test(s)) && !/opera mini/.test(s),
                operaMini: /opera mini/.test(s),
                ucbrowser: /ucbrowser/.test(s),
                mobile: (i = a(s) || c(s.substr(0, 4)),
                u(s) || c(s.substr(0, 4)) || i),
                tablet: function() {
                        var e = a(s) || c(s.substr(0, 4));
                        return (u(s) || c(s.substr(0, 4))) && !e
                }(),
                ios: /ipad|iphone|ipod/.test(s) && !window.MSStream
        }).version = l.safari ? (s.match(/.+(?:ri)[\/: ]([\d.]+)/) || [])[1] : (s.match(/.+(?:ox|me|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        l.match = function(e) {
                var t = !1
                    , n = function(n) {
                        var r = e[n];
                        ["bot", "webkit", "mozilla", "chrome", "edge", "msie", "firefox", "safari", "opera", "operaMini", "ucbrowser"].forEach(function(e) {
                                e === n && (r || (t = !0),
                                parseFloat(r) >= parseFloat(e.version) && (t = !0))
                        })
                };
                for (var r in e)
                        n(r);
                return t
        }
        ,
        l);
        function m(e, t) {
                for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
        }
        function y(e, t, n) {
                return t && m(e.prototype, t),
                n && m(e, n),
                e
        }
        var g = p.getInstance()
            , v = {
                set: function(e, t, n, r) {
                        try {
                                var o = null;
                                if (n) {
                                        var i = new Date;
                                        i.setTime(i.getTime() + 1e3 * n),
                                        o = i.toGMTString(),
                                        r && (t = t + "|" + o)
                                }
                                document.cookie = e + "=" + encodeURIComponent(t) + (o ? ";expires=" + o : "") + ";path=/"
                        } catch (e) {}
                },
                get: function(e) {
                        for (var t = e + "=", n = document.cookie.split(";"), r = 0; r < n.length; r++) {
                                for (var o = n[r]; " " == o.charAt(0); )
                                        o = o.substring(1, o.length);
                                if (0 == o.indexOf(t))
                                        return decodeURIComponent(o.substring(t.length, o.length))
                        }
                },
                update: function(e, t, n) {
                        document.cookie = e + "=" + encodeURIComponent(t) + "|" + encodeURIComponent(n) + ";expires=" + n + ";path=/"
                },
                remove: function(e) {
                        var t = e + "=";
                        t += ";path=/",
                        document.cookie = t + ";expires=Thu, 01-Jan-1970 00:00:01 GMT"
                }
        }
            , w = function() {
                function e() {
                        var t = this;
                        !function(e, t) {
                                if (!(e instanceof t))
                                        throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        this._data = {},
                        setInterval(function() {
                                var e, n = [];
                                for (Object.keys(t._data).forEach(function(e) {
                                        try {
                                                if (t._data.hasOwnProperty(e))
                                                        new Date(t._data[e].expires) < new Date && n.push(e)
                                        } catch (e) {}
                                }); e = n.pop(); )
                                        delete t._data[e]
                        }, 0)
                }
                return y(e, null, [{
                        key: "getInstance",
                        value: function() {
                                return g.c._cs || (g.c._cs = new e),
                                g.c._cs
                        }
                }]),
                y(e, [{
                        key: "set",
                        value: function(e, t, n, r) {
                                try {
                                        var o = null;
                                        if (n) {
                                                var i = new Date;
                                                i.setTime(i.getTime() + 1e3 * n),
                                                o = i.toGMTString(),
                                                r && (t = t + "|" + o)
                                        }
                                        this._data[e] = {
                                                value: t,
                                                expires: Date.now() + 1e3 * n
                                        }
                                } catch (e) {}
                        }
                }, {
                        key: "get",
                        value: function(e) {
                                return this._data[e] ? this._data[e].value : null
                        }
                }, {
                        key: "update",
                        value: function(e, t, n) {
                                try {
                                        var r = new Date(n).getTime();
                                        this._data[e] = {
                                                value: t + "|" + n,
                                                expires: r
                                        }
                                } catch (t) {
                                        try {
                                                delete this._data[e]
                                        } catch (e) {}
                                }
                        }
                }, {
                        key: "remove",
                        value: function(e) {
                                delete this._data[e]
                        }
                }]),
                e
        }().getInstance()
            , b = Object.create(v, {
                set: {
                        value: function(e, t, n, r) {
                                try {
                                        w.set(e, t, n, r),
                                        v.set(e, t, n, r)
                                } catch (e) {}
                        }
                },
                get: {
                        value: function(e) {
                                var t = w.get(e);
                                return null === t ? v.get(e) : t
                        }
                },
                update: {
                        value: function(e, t, n) {
                                w.update(e, t, n),
                                v.update(e, t, n)
                        }
                },
                remove: {
                        value: function(e) {
                                w.remove(e),
                                v.remove(e)
                        }
                }
        });
        function T(e) {
                return (T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                }
                : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                )(e)
        }
        function _(e, t) {
                if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
        }
        function k(e, t) {
                for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
        }
        function E(e, t, n) {
                return t && k(e.prototype, t),
                n && k(e, n),
                e
        }
        n(7);
        var I = p.getInstance()
            , S = 500
            , O = O || null
            , x = x || [];
        function N(e, t, n) {
                try {
                        for (var r = ["IT:", e], o = [], i = 0; i < n.length; i++)
                                n[i]instanceof Error ? o.push("IT:" + n[i]) : r.push(n[i]);
                        try {
                                R.getInstance().getNativeWindow().console[t].apply(null, r)
                        } catch (e) {
                                console[t](r)
                        }
                        for (var a = 0; a < o.length; a++)
                                try {
                                        R.getInstance().getNativeWindow()[t].call(null, o[a])
                                } catch (e) {
                                        console[t](o[a])
                                }
                        0 === (S -= o.length) && I.c.itPow && I.c.itPow.releaseAll()
                } catch (e) {
                        console.error(e)
                }
        }
        String.prototype.includes = String.prototype.includes || function(e) {
                return this.indexOf(e) > -1
        }
        ,
        Array.prototype.includes = Array.prototype.includes || function(e) {
                return this.indexOf(e) > -1
        }
        ;
        var R = function() {
                function e() {
                        _(this, e),
                        this.getNativeWindow(),
                        this.startTime = Date.now(),
                        this.lastIfId = "z"
                }
                return E(e, null, [{
                        key: "getInstance",
                        value: function() {
                                return I.c._rhw || (I.c._rhw = new e),
                                I.c._rhw
                        }
                }]),
                E(e, [{
                        key: "getTimeDelta",
                        value: function() {
                                return (Date.now() - this.startTime) / 1e3
                        }
                }, {
                        key: "docReady",
                        value: function(e) {
                                x.push(e);
                                var t = function() {
                                        if ("complete" === document.readyState || "loaded" === document.readyState || "interactive" === document.readyState) {
                                                for (; x.length > 0; )
                                                        try {
                                                                console.info("DOCREADY"),
                                                                x.pop()()
                                                        } catch (e) {}
                                                return clearInterval(O),
                                                !0
                                        }
                                        return !1
                                };
                                t() || (document.addEventListener("DOMContentLoaded", function() {
                                        t()
                                }),
                                O = setInterval(function() {
                                        t()
                                }, 0))
                        }
                }, {
                        key: "logExp",
                        value: function(e, t, n) {
                                var r = this
                                    , o = "//".concat(I.d.serverName[n]);
                                if (this.inspectUrl(window.location.href).search.includes("itDebug=trace") && this.console.error("RHW logExp", o, e, t, n),
                                !I.f.skipLogs) {
                                        "string" == typeof t && (t = {
                                                stack: "no stack",
                                                message: t
                                        });
                                        var i = "".concat(o, "/").concat(I.d.contextPath, "/olive")
                                            , a = this.origs(document).ce("script")
                                            , c = n || "unknown";
                                        a.onload = function() {
                                                r.origs(r.body()).rc(a)
                                        }
                                        ,
                                        this.origs(this.body()).ac(a),
                                        a.src = i + "?details=" + encodeURIComponent("(" + this.version + ") " + e + " - " + t.message) + "&msg=" + encodeURIComponent(t.stack) + "&cid=" + c
                                }
                        }
                }, {
                        key: "getNativeWindow",
                        value: function() {
                                try {
                                        if (I.d.ifrm)
                                                return I.d.ifrm === window ? window : I.d.ifrm.contentWindow || window;
                                        this.lastIfId = "z".concat(this.randomString(8));
                                        var e = document.createElement("iframe");
                                        e.z = 1,
                                        e.id = this.lastIfId;
                                        try {
                                                document.getElementsByTagName("body")[0].appendChild(e),
                                                e.style.display = "none"
                                        } catch (t) {
                                                try {
                                                        document.getElementsByTagName("head")[0].appendChild(e),
                                                        e.style.display = "none"
                                                } catch (t) {
                                                        e = window
                                                }
                                        }
                                        return I.d.ifrm = e,
                                        I.d.ifrm.contentWindow || window
                                } catch (e) {
                                        return window
                                }
                        }
                }, {
                        key: "inspectUrl",
                        value: function(e) {
                                var t = this
                                    , n = this.origs(document).ce("a");
                                function r(e) {
                                        var n = t.origs(document).ce("a");
                                        if (n.href = "http" === e.substr(0, 4) ? e : "".concat(window.location.protocol, "//").concat(e),
                                        (n.host.match(/[.]/g) || []).length > 1) {
                                                var r = e.split(".")[0];
                                                return r = (r = r.replace("http://", "")).replace("https://", "")
                                        }
                                        return !1
                                }
                                n.href = e;
                                var o, i, a = r(n.host), c = (i = r(o = e)) ? o.replace("".concat(i, "."), "") : o;
                                return {
                                        protocol: n.protocol.replace(":", ""),
                                        host: n.host,
                                        origin: function(e) {
                                                return e.origin || "".concat(e.protocol, "//").concat(e.hostname)
                                        }(n),
                                        search: n.search,
                                        query: function(e) {
                                                var t = {};
                                                if (e)
                                                        for (var n = e.substring(1).split("&"), r = 0; r < n.length; r++) {
                                                                var o = n[r].split("=");
                                                                t[o[0]] = o[1]
                                                        }
                                                return t
                                        }(n.search),
                                        subdomain: a,
                                        noSubdomain: c
                                }
                        }
                }, {
                        key: "getScriptTagByCid",
                        value: function(e) {
                                var t = this.origs(document).byTagName("script");
                                if (t)
                                        for (var n = 0; n < t.length; n++)
                                                try {
                                                        var r = this.inspectUrl(t[n].src);
                                                        for (var o in r.query)
                                                                if (r.query.hasOwnProperty(o) && r.query[o].toLowerCase() === e.toLowerCase())
                                                                        return t[n]
                                                } catch (e) {}
                                return !1
                        }
                }, {
                        key: "getHostByCid",
                        value: function(e) {
                                var t, n = this.getScriptTagByCid(e);
                                if (void 0 !== n) {
                                        var r = this.inspectUrl(n.src);
                                        (t = r.origin) || (t = "".concat(r.protocol, "//").concat(r.host))
                                }
                                return t = t || (this.browser.mobile ? "".concat(location.protocol, "//mycdn2.co") : "".concat(location.protocol, "//mycdn.co"))
                        }
                }, {
                        key: "isElementInElement",
                        value: function(e, t) {
                                for (var n = e, r = !1; n && t; ) {
                                        if (n === t) {
                                                r = !0;
                                                break
                                        }
                                        n = n.parentNode
                                }
                                return r
                        }
                }, {
                        key: "htmlSpecialCharsDecode",
                        value: function(e) {
                                return e.toString().replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
                        }
                }, {
                        key: "getPageTitle",
                        value: function(e) {
                                var t = this
                                    , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                                    , r = function() {
                                        var e = t.origs(t.head()).byTagName("title")
                                            , n = null;
                                        return void 0 !== e && e.length > 0 && 0 === (n = t.htmlSpecialCharsDecode(e[0].innerHTML)).toLowerCase().indexOf("watch ") && (n = n.substr(6)),
                                        n
                                }
                                    , o = r();
                                return null !== o || 20 === n ? (e && e(o),
                                o) : null !== o ? (e && e(o),
                                o) : void window.setTimeout(function() {
                                        r()
                                }, 10)
                        }
                }, {
                        key: "randomString",
                        value: function() {
                                for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5, t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = 0; r < e; r++)
                                        t += (0 === r ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" : n).charAt(Math.floor(Math.random() * n.length));
                                return t
                        }
                }, {
                        key: "isFunction",
                        value: function(e) {
                                return !!(e && e.constructor && e.call && e.apply)
                        }
                }, {
                        key: "isPrimitive",
                        value: function(e) {
                                var t = T(e);
                                return null == e || "object" != t && "function" != t
                        }
                }, {
                        key: "highestZ",
                        value: function() {
                                for (var e = this.origs(document).byTagName("*"), t = 0, n = null, r = 0; r < e.length; r++)
                                        if (!Number.isNaN(e[r].style.zIndex)) {
                                                var o = parseInt(e[r].style.zIndex);
                                                (t < o || t === o) && (t = o,
                                                n = e[r])
                                        }
                                return n
                        }
                }, {
                        key: "queryToObj",
                        value: function(e, t) {
                                var n, r = e.indexOf("?"), o = {};
                                if ((n = !t && r > -1 ? decodeURIComponent(e.substr(r)) : decodeURIComponent(e)) && n.length > 1) {
                                        r > -1 && (n = n.substr(1));
                                        for (var i = n.indexOf("&") > 1 ? n.split("&") : [n], a = 0; a < i.length; a++) {
                                                var c = i[a].split("=");
                                                o[c[0]] = c[1]
                                        }
                                }
                                return o
                        }
                }, {
                        key: "body",
                        value: function(e) {
                                return C.elementReady("body", e, !0)
                        }
                }, {
                        key: "head",
                        value: function(e) {
                                return C.elementReady("head", e, !0)
                        }
                }, {
                        key: "origs",
                        value: function(e) {
                                var t = this.getNativeWindow();
                                return C.getOrigs(t, e)
                        }
                }, {
                        key: "cookie",
                        get: function() {
                                return b
                        }
                }, {
                        key: "browser",
                        get: function() {
                                return h
                        }
                }, {
                        key: "console",
                        get: function() {
                                var e = this;
                                return {
                                        trace: function(t) {
                                                I.f.allowTr && e.inspectUrl(window.location.href).search.includes("itDebug=trace") && N(e.getTimeDelta(), "debug", arguments)
                                        },
                                        debug: function(t) {
                                                if (I.f.allowTr) {
                                                        var n = e.inspectUrl(window.location.href).search;
                                                        (n.includes("itDebug=trace") || n.includes("itDebug=debug")) && N(e.getTimeDelta(), "info", arguments)
                                                }
                                        },
                                        error: function(t) {
                                                if (I.f.allowTr) {
                                                        var n = e.inspectUrl(window.location.href).search;
                                                        (n.includes("itDebug=trace") || n.includes("itDebug=debug")) && N(e.getTimeDelta(), "error", arguments)
                                                }
                                        }
                                }
                        }
                }]),
                e
        }()
            , P = R
            , C = function() {
                function e() {
                        _(this, e)
                }
                return E(e, null, [{
                        key: "elementReady",
                        value: function(e, t, n) {
                                var r = t || function(e) {
                                        return e
                                }
                                    , o = R.getInstance().origs(document).byTagName(e);
                                if (o.length > 0)
                                        return r(n ? o[0] : o);
                                var i = setInterval(function() {
                                        var t = R.getInstance().origs(document).byTagName(e);
                                        t.length > 0 && (clearInterval(i),
                                        r(n ? t[0] : t))
                                }, 0);
                                return -1
                        }
                }, {
                        key: "getOrigs",
                        value: function(e, t) {
                                return {
                                        ael: function() {
                                                try {
                                                        return e.EventTarget.prototype.addEventListener.apply(t, arguments)
                                                } catch (e) {
                                                        try {
                                                                return t.addEventListener.apply(t, arguments)
                                                        } catch (e) {
                                                                var n = arguments;
                                                                return n[0] = "on" + n[0],
                                                                t.attachEvent.apply(t, n)
                                                        }
                                                }
                                        },
                                        rel: function() {
                                                try {
                                                        return e.EventTarget.prototype.removeEventListener.apply(t, arguments)
                                                } catch (e) {
                                                        try {
                                                                return t.removeEventListener.apply(t, arguments)
                                                        } catch (e) {
                                                                var n = arguments;
                                                                return n[0] = "on" + n[0],
                                                                t.detachEvent.apply(t, n)
                                                        }
                                                }
                                        },
                                        de: function() {
                                                try {
                                                        return e.EventTarget.prototype.dispatchEvent.apply(t, arguments)
                                                } catch (e) {
                                                        return t.dispatchEvent.apply(t, arguments)
                                                }
                                        },
                                        ce: function() {
                                                try {
                                                        return e.document.createElement.apply(t, arguments)
                                                } catch (e) {
                                                        return document.createElement.apply(t, arguments)
                                                }
                                        },
                                        wo: function() {
                                                try {
                                                        return e.open.apply(t, arguments)
                                                } catch (e) {
                                                        return window.open.apply(t, arguments)
                                                }
                                        },
                                        ac: function() {
                                                try {
                                                        return e.Node.prototype.appendChild.apply(t, arguments)
                                                } catch (e) {
                                                        return t.getElementsByTagName.apply(t, arguments)
                                                }
                                        },
                                        rc: function() {
                                                try {
                                                        return e.Node.prototype.removeChild.apply(t, arguments)
                                                } catch (e) {
                                                        return t.removeChild.apply(t, arguments)
                                                }
                                        },
                                        byId: function() {
                                                try {
                                                        return e.document.getElementById.apply(document, arguments)
                                                } catch (e) {
                                                        return document.getElementById.apply(document, arguments)
                                                }
                                        },
                                        byTagName: function() {
                                                try {
                                                        return e.Element.prototype.getElementsByTagName.apply(t, arguments)
                                                } catch (e) {
                                                        return t.getElementsByTagName.apply(t, arguments)
                                                }
                                        },
                                        byClassName: function() {
                                                try {
                                                        return e.Element.prototype.getElementsByClassName.apply(t, arguments)
                                                } catch (e) {
                                                        return t.getElementsByClassName.apply(t, arguments)
                                                }
                                        },
                                        selectAll: function() {
                                                try {
                                                        return e.document.querySelectorAll.apply(t, arguments)
                                                } catch (e) {
                                                        return t.querySelectorAll.apply(t, arguments)
                                                }
                                        },
                                        insert: function() {
                                                try {
                                                        return e.Element.prototype.insertAdjacentHTML.apply(t, arguments)
                                                } catch (e) {
                                                        return t.insertAdjacentHTML.apply(t, arguments)
                                                }
                                        }
                                }
                        }
                }]),
                e
        }()
            , A = ["BANNER", "BANNER_WRAPPER", "BANNER_WRAPPER_FOOTER", "BOUNCE", "FLOATING_BANNER", "POPUNDER", "TOP_BANNER", "FOOTER", "INTERSTITIAL", "MOBILE_REDIR", "MOBILE_DIALOG", "MOBILE_NOTIFIER", "MOBILE_INTERSTITIAL", "HEAD_AD", "IN_MEDIA_BANNER", "TILT_BANNER", "D2S_MENU", "POPUNDER_DI"];
        function j(e, t) {
                for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
        }
        function B(e, t, n) {
                return t && j(e.prototype, t),
                n && j(e, n),
                e
        }
        var D = P.getInstance()
            , M = function() {
                function e(t) {
                        !function(e, t) {
                                if (!(e instanceof t))
                                        throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        this.stackProd = t && Array.isArray(t) ? [].concat(t) : [],
                        this.stackBeta = {}
                }
                return B(e, null, [{
                        key: "isItStack",
                        value: function(t) {
                                return t instanceof e
                        }
                }]),
                B(e, [{
                        key: "push",
                        value: function(e) {
                                D.console.trace("PUSHING PROD", e),
                                this.stackProd.push(e)
                        }
                }, {
                        key: "pushBeta",
                        value: function(e, t) {
                                D.console.trace("PUSHING BETA", e, t);
                                var n = t.split("/");
                                n = n[n.length - 1],
                                this.stackBeta[n] = this.stackBeta[n] || [],
                                this.stackBeta[n].push(e)
                        }
                }, {
                        key: "pop",
                        value: function() {
                                try {
                                        throw new Error
                                } catch (r) {
                                        var e = r.stack;
                                        for (var t in this.stackBeta) {
                                                var n;
                                                if (e.indexOf(t) > -1)
                                                        return !(n = this.stackBeta[t].pop()) || D.console.trace("FROM BETA", t, n),
                                                        n || this.stackProd.pop()
                                        }
                                        return !(n = this.stackProd.pop()) || D.console.trace("FROM PROD", n),
                                        n
                                }
                        }
                }, {
                        key: "length",
                        get: function() {
                                try {
                                        throw new Error
                                } catch (n) {
                                        var e = n.stack;
                                        for (var t in this.stackBeta)
                                                if (e.indexOf(t) > -1)
                                                        return this.stackBeta[t].length;
                                        return this.stackProd.length
                                }
                        }
                }, {
                        key: "totalLength",
                        get: function() {
                                var e = 0;
                                for (var t in this.stackBeta)
                                        e += this.stackBeta[t].length;
                                return this.stackProd.length + e
                        }
                }]),
                e
        }();
        function L(e, t) {
                for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value"in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
        }
        var U = p.getInstance()
            , F = function() {
                function e() {
                        !function(e, t) {
                                if (!(e instanceof t))
                                        throw new TypeError("Cannot call a class as a function")
                        }(this, e)
                }
                var t, n, r;
                return t = e,
                r = [{
                        key: "getInstance",
                        value: function() {
                                return U.d._$rh || (U.d._$rh = [],
                                A.forEach(function(e) {
                                        U.d._$rh[e] = new M
                                })),
                                U.d._$rh
                        }
                }, {
                        key: "status",
                        value: function() {
                                var e = {};
                                return A.forEach(function(t) {
                                        var n = U.d._$rh[t].totalLength;
                                        n > 0 && (e[t] = n)
                                }),
                                e
                        }
                }],
                (n = null) && L(t.prototype, n),
                r && L(t, r),
                e
        }()
            , z = p.getInstance()
            , W = P.getInstance();
        var q = function(e, t, n, r) {
                var o = W.origs(document).ce("script");
                o.setAttribute("data-cfasync", "false");
                var i = "rh_tag_" + e + "_" + t;
                o.setAttribute("id", i),
                o.type = "text/javascript",
                o.src = n,
                o.setAttribute("data-it-internal", t + "|" + r),
                o.onload = function() {
                        z.c.itPow && z.c.itPow.selectiveRelease && z.c.itPow.selectiveRelease()
                }
                ;
                var a = W.getScriptTagByCid(r);
                if (!a) {
                        var c = W.origs(document).byTagName("script");
                        a = c[c.length - 1]
                }
                W.isElementInElement(a, W.head()) ? W.origs(window).ael("load", function() {
                        W.origs(W.body()).ac(o)
                }, !1) : a.parentNode.insertBefore(o, a.nextSibling);
                return i
        }
            , H = P.getInstance()
            , $ = p.getInstance();
        var G = function(e, t, n) {
                for (var r = 0; r < e.length; r++) {
                        var o, i, a;
                        e[r] && e[r].v.length > 0 && function() {
                                var c = e[r].n
                                    , u = e[r].v;
                                o = H.origs(document).ce("script"),
                                i = c.substr(2, 2),
                                a = i + "_tag_" + t + "_" + n,
                                o.setAttribute("id", a),
                                o.type = "text/javascript",
                                o.src = u + "&cb=" + Date.now(),
                                o.setAttribute("data-cfasync", "false"),
                                o.onload = function(e) {
                                        $.f.et[c] = !0
                                }
                                ,
                                o.onerror = function(e) {
                                        H.logExp("TrafficDist extra tags " + c, e, n)
                                }
                                ,
                                H.origs(H.head()).ac(o)
                        }()
                }
        };
        n(8),
        n(9);
        var J, V = p.getInstance(), X = P.getInstance(), Y = F.getInstance(), K = "359246_703845_1", Z = "BOUNCE", Q = {
                dbcid: '367804199',
                cid: '359246_703845_1',
                format: 'page',
                tagtype: 'bounce',
                pause: '5',
                ap: 'cmp=BOUNCE&evp=YvhPak34pGk5TNo1uZcPYlY37AsT2Aewbd9Bb6JqibZ7ZM8mR5KDwycpQMpRgrEA&sjv=80.2&ctid=0'
        };
        try {
                isNaN("66048204255") || X.cookie.get("rhid_c") || X.cookie.set("rhid_c", "66048204255"),
                V.f.skipLogs = "true" === "false".toLowerCase(),
                V.f.abBoolPop = "true" === "@@AB_BOOL_POP@@".toLowerCase(),
                V.d.abPercent = "0",
                V.d.serverJsVersion = "80.2",
                V.f.allowTr = "elvis" === "false".toLowerCase(),
                V.f.enableSimon = "true" === "false".toLowerCase(),
                V.d.simonBrowsers = "operaMini,ucbrowser".split && "operaMini,ucbrowser".split(","),
                V.d.serverName = V.d.serverName || {},
                V.d.serverName[K] = "mybetterdl.com",
                V.d.serverName["359246_703845_1"] = "mybetterdl.com",
                V.d.betaClients = [],
                V.d.contextPath = "adServe".startsWith("@@") ? "adServe" : "adServe",
                window._p = "Lcf8216Ko420",
                Q.serverName = "mybetterdl.com",
                Q.ap ? Q.ap += "&th=" + window.innerHeight + "&tw=" + window.innerWidth : Q.ap = "th=" + window.innerHeight + "&tw=" + window.innerWidth,
                document.referrer && (Q.ap += "&docRef=" + encodeURIComponent(document.referrer)),
                Y[Z].push(Q),
                V.f.inco = -1,
                J = function() {
                        try {
                                V.pageTitle = X.getPageTitle(function(e) {
                                        if (e && (e = e.replace(/&/g, "and")),
                                        Q.tipRegex)
                                                try {
                                                        var t, n = decodeURIComponent(Q.tipRegex.replace(/\+/g, "%20")).replace(/__\$__/g, "|"), r = n.split("/");
                                                        if (r.length >= 3) {
                                                                var o = r.slice(1, r.length - 1).join("/")
                                                                    , i = r[r.length - 1];
                                                                t = e.match(new RegExp(o,i))
                                                        } else
                                                                t = e.match(n);
                                                        t && t instanceof Array && t.length > 0 && (e = t[t.length - 1])
                                                } catch (e) {}
                                        e && (Q.ap += "&tip=" + e)
                                }),
                                Q.we = "Lcf8216Ko420",
                                q(Z, K, "//p359246.mycdn.co/banners/bounce/bounce-tag_80.2-1.js", "359246_703845_1"),
                                V.f.et = Object.assign({
                                        pmTag: !1,
                                        amTag: !1,
                                        lbTag: !1
                                }, V.f.et || {}),
                                G([{
                                        n: "pmTag",
                                        v: ""
                                }, {
                                        n: "amTag",
                                        v: ""
                                }, {
                                        n: "lbTag",
                                        v: ""
                                }], Z, K),
                                window[window._p] || (window[window._p] = function(e) {}
                                ,
                                Object.defineProperty(window[window._p], "i", {
                                        configurable: !1,
                                        writable: !1,
                                        value: []
                                })),
                                window._bp = function(e) {
                                        for (var t = 0; t < window[window._p].i.length; t++)
                                                window[window._p].i[t].call(window, e)
                                }
                                ;
                                var e = "click"
                                    , t = X.browser.firefox || X.browser.mozilla || X.browser.chrome;
                                X.browser.chrome && (e = "mousedown"),
                                V.f.wonAdded || X.origs(document).ael(e, window._bp, t ? {
                                        capture: !0
                                } : void 0),
                                V.f.wonAdded = !0
                        } catch (e) {
                                X.logExp("TrafficDist (post inco)", e, K)
                        }
                }
                ,
                h.chrome || h.firefox ? ["chrome", "firefox"].forEach(function(e) {
                        var t;
                        h[e] && (t = e,
                        new r.a(function(e, n) {
                                try {
                                        if ("chrome" === t) {
                                                var r = window.RequestFileSystem || window.webkitRequestFileSystem;
                                                r || e(!1),
                                                r(window.TEMPORARY, 100, function() {
                                                        e(!1)
                                                }, function() {
                                                        e(!0)
                                                })
                                        } else if ("firefox" === t) {
                                                var o = indexedDB.open("test");
                                                o.onerror = function() {
                                                        e(!0)
                                                }
                                                ,
                                                o.onsuccess = function() {
                                                        e(!1)
                                                }
                                        }
                                } catch (e) {
                                        n(e)
                                }
                        }
                        )).then(function(e) {
                                e && (Q.ap += "&inco=1",
                                X.console.trace("Is private session")),
                                J()
                        }, function(e) {
                                X.logExp("TrafficDist isIncognito", e, K),
                                J()
                        })
                }) : J()
        } catch (e) {
                X.logExp("TrafficDist", e, K)
        }
}
]);

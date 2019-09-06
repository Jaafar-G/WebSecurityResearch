import subprocess
import time

# The name of the browser 
browser = "firefox"

# Represents the browser with the requested url to open 

browserState = ''


# List of the urls to open 
urls = [ 
	"http://quickwebchecker.com", 
	"http://quickwebchecker.com/about-us.html",
        "http://quickwebchecker.com/html-tricks.html",
	"http://quickwebchecker.com/css-tricks.html",
        "http://quickwebchecker.com/js-tricks.html", 
        "http://quickwebchecker.com/search.html",
	"http://quickwebchecker.com/terms-and-conditions.html",
	"http://quickwebchecker.com/events.html"
	]


# Co-ordinate to click 
xmouse = 1500; 
ymouse = 1500


# Generic process command
def run(cmd):
    subprocess.Popen(cmd)
    time.sleep(0.2)


def get(cmd):
    return subprocess.check_output(cmd).decode("utf-8").strip()

# Runs requested browser
def run_browser(browser, url):
    fetchOptions = [browser, url]
    run(fetchOptions)
    while True:
        time.sleep(1)
        try:
            pid = get(["pgrep", browser])
        except subprocess.CalledProcessError:
            pass
        else:
            time.sleep(0.1)
            w = [l.split()[0] for l in get(["wmctrl", "-lp"]).splitlines() if pid in l][0]
            break
    return browserState


cmd1 = ["xdotool", "windowsize", browserState, "100%", "100%"]
cmd2 = ["xdotool", "mousemove", str(xmouse), str(ymouse)]
cmd3 = ["xdotool", "click", "1"]

cmd4 = ["xdotool", "getactivewindow"] 
cmd5 = ["xdotool", "key", "End"]



#close browser and start a clean slate
def close(browser):
   # go to the browser window containing name
   cmd6 = ["wmctrl", "-a", browser]
  # send keystore to browser to close current tab 
   cmd7 = ["xdotool", "key", "Ctrl+w"]
  # share a window with a title that contains the 'browser word name' 
   cmd8 = ["wmctrl", "-r", browser, "-b", "add,shaded"]
   cmd9 = ["pkill", "-f", browser]
   closecmds = [cmd6, cmd7, cmd8, cmd9]
   for cmd in closecmds:
     run(cmd)
  

# For each urls visit the page and make a click
for url in urls:
   browserState = run_browser(browser, url)
   for cmd in [cmd2]:
     run(cmd)
     time.sleep(1)
   run(cmd3)
   time.sleep(5)
   close(browser)


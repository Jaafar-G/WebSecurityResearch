import subprocess
import time

# The name of the browser 
browser = "firefox"

# Represents the browser with the requested url to open 

browserState = ''


# List of the urls to open 
def getUrls():
  urls = []
  filePath = 'urls.txt'
  with open(filePath, 'r') as f:
    for url in f:
      urls.append(url)
  return urls

urls = getUrls()

print(urls)

# Co-ordinate to click 
xmouse = 4500; 
ymouse = 500


# Generic process command
def run(cmd):
    subprocess.Popen(cmd)
    time.sleep(0.2)


def get(cmd):
  subprocess.Popen(cmd)

# Runs requested browser
def run_browser(browser, url):
    fetchOptions = [browser, url]
    cmd = "/home/bacharya/chromium/src/out/Builder/chrome --no-sandbox " + str(url)
    prcs = subprocess.Popen(cmd, stdout=None, shell=True, stdin=None, close_fds=None)
    # while True:
    #     time.sleep(1)
    #     try:
    #         pid = get(["pgrep", browser])
    #     except subprocess.CalledProcessError:
    #         pass
    #     else:
    #         time.sleep(0.1)
    #         w = [l.split()[0] for l in get(["wmctrl", "-lp"]).splitlines() if pid in l][0]
    #         break
    # return browserState


cmd1 = ["xdotool", "windowsize", browserState, "100%", "100%"]
cmd2 = ["xdotool", "mousemove", str(xmouse), str(ymouse), "click", "1"]
cmd3 = ["xdotool", "click", "1"]

cmd4 = ["xdotool", "getactivewindow"] 
cmd5 = ["xdotool", "key", "End"]
cmd6 = ["xdotool", "getactivewindow"]


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
   run_browser(browser, url)
   for cmd in [cmd2]:
     run(cmd)
     time.sleep(5)
   run(cmd4)  
   run(cmd3)
   run(cmd3)
   time.sleep(5)
   close(browser)


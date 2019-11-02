import subprocess
import signal
import os
from subprocess import STDOUT, check_output
import time

def getUrls():
  urls = []
  filePath = 'urls.txt'
  with open(filePath, 'r') as f:
    for url in f:
      urls.append(url)
  return urls

def activate_window_via_pid():
  cmd1 = ["xdotool", "search", "--class", "chrome"]
  out = check_output(cmd1)  
  print(out)

  cmd2 = ["xdotool", "windowactivate", "--sync", windowId]
  prcs = subprocess.Popen(cmd2, stdout=subprocess.PIPE, shell=True, preexec_fn=os.setsid)
  cmd3 = ["xdotool", "click", "1"]
  prcs = subprocess.Popen(cmd3, stdout=subprocess.PIPE, shell=True, preexec_fn=os.setsid)


urls = getUrls()

print(urls)

for url in urls:
  if url == urls[len(urls) - 1]:
    print("Breaking now")
    break
  cmd = "/home/bacharya/chromium/src/out/Builder/chrome --no-sandbox " + str(url)
  prcs = subprocess.Popen(cmd, stdout=None, shell=True, stdin=None, close_fds=True)
# cmd3 = ["xdotool", "click", "--window", str(prcs.pid), "1"]
# prcs = subprocess.Popen(cmd3, stdout=subprocess.PIPE, shell=True, preexec_fn=os.setsid)


print("Sleeping for 10 sec")
time.sleep(15)
print("Sleept for 10 sec")

for i in range(1, len(urls)):
  cmd1 = ["xdotool", "getactivewindow"]
  subprocess.Popen(cmd1, stdout=None, shell=True, stdin=None, close_fds=True)
  cmd2 = ["xdotool", "mousemove", "100", "100", "click", "1"]
  subprocess.Popen(cmd2, stdout=None, shell=True, stdin=None, close_fds=True)





while true; do
    sudo python /var/www/tools/session_insert.py > /var/www/sessions/nohup.out
    sleep 30
done

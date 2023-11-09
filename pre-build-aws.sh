sudo su
cd /
yum install -y git tmux
dnf install -y tmux
git clone https://github.com/D4rk61/script-aws.git
cd script-aws
chmod 777 felsv-rhel.sh
./felsv-rhel.sh --prod

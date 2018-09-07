#/usr/bin/sh
if [ -f /mnt/zmcl/check ]; then
	mv /var/www/html/2018bd/ybd/api/zmcl/* /mnt/zmcl/
	mv /var/www/html/2018bd/ybd/api/zmcl_thumbnail/* /mnt/zmcl/thumbnail
	echo "synchronized!";
else
	#重新挂载磁盘
	mount -t cifs //file服务器地址/zmcl /mnt/zmcl -o username=用户名,password=密码
	echo "remounted!";
fi
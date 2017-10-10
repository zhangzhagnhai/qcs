@Echo on
set sPath="E:\work\QCS-2.0\github\qcs\dist"
set sPatha="E:\work\QCS-2.0\github\qcs\dist\static"
set sPathb="E:\work\QCS-2.0\github\qcs\dist\static\js"
set sPathc="E:\work\QCS-2.0\github\qcs\dist\static\css"
set sPathd="E:\work\QCS-2.0\github\qcs\dist\static\img"

Echo close www.hcsoo.com >ftp.tmp
Echo open www.hcsoo.com >ftp.tmp
Echo zzh>>ftp.tmp
Echo 123>>ftp.tmp
Echo cd /laravel.hcsoo.com/public>>ftp.tmp
for /r %sPath% %%i in (*.html) do (
  Echo put %%i >>ftp.tmp
)


Echo rmdir static>>ftp.tmp
Echo mkdir static>>ftp.tmp
Echo cd static>>ftp.tmp
Echo mkdir js>>ftp.tmp
Echo mkdir css>>ftp.tmp
Echo mkdir img>>ftp.tmp

Echo cd js>>ftp.tmp
for /r "%sPathb%" %%c in (*.*) do (
  Echo put %%c >>ftp.tmp
)

Echo cd ../css>>ftp.tmp
for /r "%sPathc%" %%c in (*.*) do (
  Echo put %%c >>ftp.tmp
)

Echo cd ../img>>ftp.tmp
for /r "%sPathd%" %%c in (*.*) do (
  Echo put %%c >>ftp.tmp
)
FTP -s:ftp.tmp
del ftp.tmp /q
bye

***Đồ án môn học Diện toán đám mây***
---
**Tên đề tài:** Xây dựng trang web viết code online dựa trên Mearn stack docker EC2<br/>
**Giáo viên hướng dẫn đề tài:** <br/>
Huỳnh Xuân Phụng<br/>
**Nhóm thực hiện:**<br/>
  18110151-Trần Hoàng Long<br/>
  18110199-Trần Nhật Thành<br/>
  18110201-Lê Đức Thắng<br/>
**Danh sách yêu cầu của đề tài:**<br/>
### Yêu cầu môi trường:
- nodejs:^13.
- docker + docker-compose
- nên dùng EC2 ubuntu
### Cách thực thi và build project
1. Clone project và cd vào thư mục chính
2. build docker   `sudo docker-compose -f docker-compose.yml up -d --build` 
3. có thể thiếu name Volume server sử dụng lệnh `docker volume create --name=Server` và tiến hành run 
 sau khi hoàn thành sẽ có container:server, client, py, java, gcc, mono, nginx
3. kiểm tra quá trình build sử dụng lệnh `docker logs <tên container>` để kiểm tra quá trình có hoàn thành hay không
4. nếu hoàn thành khi vào port 3000 sẽ vào đuọc trang chính react và port 0.0.0.0:4000/test sẽ vào dược kết quả ok

### Một số lỗi thường gặp
- build thiếu module express: cách xử lý  `docker exec -it server /bin/sh ` và chạy lệnh `npm install`
- port 80 đã được dùng: stop service port 80 và tiến hành build lại

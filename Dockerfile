# Sử dụng image Node.js với phiên bản mong muốn
FROM node:latest

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn Node.js vào thư mục làm việc
COPY . .

# Mở cổng mặc định để truy cập server Node.js
EXPOSE 5000

# Lệnh chạy server khi container được khởi chạy
CMD ["node", "server.js"]

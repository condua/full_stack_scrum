# Sử dụng image Node.js với phiên bản mong muốn
FROM node:latest

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn React vào thư mục làm việc
COPY . .

# Mở cổng mặc định để truy cập ứng dụng React
EXPOSE 3000

# Lệnh chạy ứng dụng khi container được khởi chạy
CMD ["npm", "start"]

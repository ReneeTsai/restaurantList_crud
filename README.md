# 我的餐廳清單

![Index page about Restaurant List](./public/S3A1_restaurantList.PNG)

## 介紹

可以透過 google、facebook 或是自行建立帳號登入，
紀錄屬於自己的餐廳清單，可以瀏覽餐廳、查看詳細資訊、甚至連結到地圖。

### 功能

- 查看所有餐廳
- 瀏覽餐廳的詳細資訊
- 連結餐廳的地址到 Google 地圖
- 搜尋特定餐廳
- 新增餐廳
- 編輯餐廳
- 刪除餐廳

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```

4. 安裝完畢後，繼續輸入：

   ```bash
   npm run start
   npm run seed
   ```

5. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Listening on http://localhost:3000
   ```

6. 若欲暫停使用

   ```bash
   ctrl + c
   ```

## 開發工具

- Node.js 18.16.0
- Express 4.18.2
- Express-Handlebars 3.0.0
- body-parser 1.20.2
- bcryptjs2.4.3
- connect-flash 0.1.1
- dotenv 8.2.0
- express-session 1.17.3
- method-override 3.0.0
- mongoose 5.9.7
- nodemon 3.0.1
- passport 0.4.1
- passport-facebook 3.0.0
- passport-google-oauth20 2.0.0
- passport-local 1.0.0

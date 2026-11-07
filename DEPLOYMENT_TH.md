# วิธีเปิดใช้นามบัตรออนไลน์ทีละขั้น

ขณะนี้เว็บไซต์ทำงานในเครื่อง ยังไม่ได้ส่งโค้ดไป GitHub หรือเผยแพร่สาธารณะ

GitHub ใช้เก็บโค้ดและประวัติการแก้ไข ส่วน Cloudflare Pages ใช้เปิดเว็บไซต์ให้ผู้อื่นเข้าผ่านลิงก์หรือ QR ได้ เส้นทางที่แนะนำคือ **GitHub + Cloudflare Pages** โดยใช้เว็บไซต์แบบ static ตามที่โครงการเตรียมไว้

## 1. ตรวจนามบัตรในเครื่อง

เปิด Terminal ในโฟลเดอร์โครงการ แล้วรัน:

```powershell
pnpm.cmd preview
```

เปิด http://127.0.0.1:3000 ตรวจชื่อ หน่วยงาน รูป เบอร์โทร LINE และอีเมล หากแจ้งว่า port ถูกใช้อยู่ ให้ใช้หน้าตัวอย่างที่เปิดไว้แล้ว

ก่อนเผยแพร่ต้องยืนยันผู้ให้บริการและ URL จริง ลิงก์ในเครื่องใช้เฉพาะตรวจงาน ไม่ใช่ลิงก์สำหรับส่งให้ Professor

## 2. สร้างที่เก็บโค้ดใน GitHub

1. เข้าบัญชีของคุณที่ https://github.com แล้วเลือก **New repository**
2. ตั้งชื่อ เช่น `chaithawat-business-card` ชื่อนี้เป็นข้อเสนอ ยังไม่ได้สร้าง
3. เลือก **Private** เพื่อจำกัดการเข้าถึงซอร์สโค้ด หากต้องการเปิดโค้ดให้ผู้อื่นอ่านจึงเลือก Public
4. ไม่ต้องเพิ่ม README, .gitignore หรือ License เพราะโครงการนี้มีไฟล์เริ่มต้นแล้ว
5. กด **Create repository** แล้วคัดลอก URL ของ repository ที่ได้จริง

ส่งโค้ดจากโฟลเดอร์โครงการด้วยคำสั่งต่อไปนี้ เปลี่ยน `YOUR-USERNAME` และชื่อ repository ให้ตรงของจริง:

```powershell
git add .
git commit -m "Build digital business card"
git remote add origin https://github.com/YOUR-USERNAME/chaithawat-business-card.git
git push -u origin HEAD
```

ทำคำสั่งนี้หลังอนุมัติการส่งโค้ดแล้วเท่านั้น หากมี `origin` อยู่แล้ว ให้ตรวจ `git remote -v` ก่อนและอย่าเพิ่มซ้ำ ทำการเข้าสู่ระบบด้วยตัวเอง ไม่ส่งรหัสผ่านหรือ token ในแชต ไฟล์ `.env.local`, dependencies และผล build ถูกยกเว้นโดย `.gitignore` แล้ว

## 3. เชื่อม Cloudflare Pages

1. เข้าบัญชี Cloudflare ของคุณ แล้วไปที่ **Workers & Pages**
2. เลือก **Create application → Pages → Import an existing Git repository** ชื่อเมนูอาจปรับเปลี่ยนได้
3. เชื่อม GitHub และอนุญาตเฉพาะ repository ของโครงการนี้
4. เลือก repository และ production branch ที่ส่งโค้ดไว้จริง
5. ตั้งชื่อ project เช่น `chaithawat-card` หากว่าง ชื่อนี้เป็นเพียงตัวอย่าง ยังไม่ยืนยันว่าจองได้
6. เลือก preset **Next.js (Static HTML Export)** แล้วตรวจค่าต่อไปนี้:

| ค่า | ตั้งเป็น |
| --- | --- |
| Root directory | โฟลเดอร์หลักของ repository |
| Build command | `pnpm build` |
| Build output directory | `out` |
| Node version | `24` |
| pnpm version | `11.25.0` ตาม `packageManager` ในโครงการ |

หาก build image ไม่ใช้ pnpm รุ่นที่ระบุ ให้ตั้ง `PNPM_VERSION=11.25.0` และ `NODE_VERSION=24` ใน build environment ตามเอกสาร Cloudflare

## 4. กำหนด URL ถาวรก่อนเริ่มเผยแพร่

1. ตรวจชื่อ project ที่ Cloudflare ยอมรับและ URL production ที่จะใช้ เช่น `https://ชื่อที่ยืนยันแล้ว.pages.dev/`
2. ยืนยันว่าต้องการใช้ URL นี้เป็นลิงก์ถาวรของนามบัตร และอนุมัติให้เผยแพร่ข้อมูลติดต่อกับภาพ
3. เพิ่ม environment variable ในส่วน **Production**:
   - ชื่อ: `NEXT_PUBLIC_SITE_URL`
   - ค่า: URL production จริงแบบ `https://…pages.dev/`
   - เพิ่ม `NEXT_TELEMETRY_DISABLED=1` เพื่อปิด telemetry ระหว่าง build
4. เมื่อยืนยันแล้วจึงกด **Save and Deploy**

**ห้ามคัดลอก URL ของ branch preview หรือ localhost มาใส่** หากเพิ่งทราบ URL จริงหลัง deploy ครั้งแรก ให้ตั้งค่านี้แล้ว deploy ใหม่ก่อนแจก QR รุ่นสมบูรณ์

## 5. ทดสอบก่อนส่งให้ผู้อื่น

1. รอ build และ deployment ขึ้นสถานะสำเร็จ แล้วเปิด URL บนมือถือ
2. ทดสอบ **โทรมือถือ**, **โทรสำนักงาน**, **WhatsApp**, **Instagram** และ **ส่งอีเมล**
3. ทดสอบ LINE: แตะคัดลอก ID → เปิด LINE → เพิ่มเพื่อน → ค้นหาด้วย ID → วาง `0866078928` และตรวจว่าเป็นบัญชีที่ถูกต้อง ความสามารถในการค้นหาขึ้นกับการตั้งค่าบัญชี LINE
4. แตะ **บันทึกผู้ติดต่อ** แล้วเปิดไฟล์ที่ดาวน์โหลด ตรวจว่าโทรศัพท์และอีเมลถูกเพิ่มถูกต้อง ทั้ง iPhone และ Android
5. ดาวน์โหลดรูป QR และทดลองสแกนจากโทรศัพท์อีกเครื่อง ตรวจว่าเปิด URL production ที่ยืนยันไว้จริง
6. ทดลองส่งลิงก์หรือ QR ให้ Professor หนึ่งท่าน ตรวจว่ามองเห็นปุ่มง่ายและเปิดติดต่อได้โดยไม่ต้องสมัครบัญชีเว็บไซต์

หลังผ่านขั้นตอนนี้จึงส่ง QR ให้ผู้อื่นหรือใช้พิมพ์บนนามบัตร

## 6. วิธีใช้งานสำหรับ Professor

**สแกน QR → เปิดหน้าเว็บ → แตะช่องทางที่ต้องการ** ผู้รับไม่ต้องมี GitHub, Cloudflare หรือบัญชีเว็บไซต์นี้

- ต้องการเก็บเบอร์: แตะ **บันทึกผู้ติดต่อ** แล้วเพิ่มรายชื่อในโทรศัพท์
- ต้องการโทร: แตะ **โทรมือถือ** หรือ **โทรสำนักงาน**
- ต้องการอีเมล: แตะช่อง Gmail แล้วเขียนข้อความในแอปอีเมลที่ตั้งไว้บนเครื่อง
- ต้องการ LINE: แตะคัดลอก ID แล้วค้นหาเพิ่มเพื่อนใน LINE

## 7. แก้ข้อมูลภายหลัง

แก้ข้อมูลใน `src/config/profile.ts` ตรวจงานด้วย `pnpm test`, `pnpm typecheck`, `pnpm build` แล้ว commit/push ไป production branch เดิม Cloudflare Pages จะ build และเผยแพร่การแก้ไขให้อัตโนมัติเมื่อเปิด Git integration ไว้ ถ้าเปลี่ยน URL ต้องสร้าง QR ใหม่และเปลี่ยน QR ที่แจกไว้ด้วย

## ข้อจำกัดและค่าใช้จ่าย

โครงการนี้เป็น static export ไม่มีเซิร์ฟเวอร์หรือฐานข้อมูล ไม่ต้องซื้อโดเมนสำหรับเริ่มต้น แผนฟรีของ Pages มีขีดจำกัด เช่น จำนวน build และขนาดไฟล์ โปรดตรวจเงื่อนไขปัจจุบันก่อนเลือกใช้ ห้ามซื้อโดเมนหรือแผนเสียเงินโดยไม่มีการอนุมัติ

เอกสารทางการที่ใช้ตรวจวิธีตั้งค่า:

- [Cloudflare: Next.js Static HTML Export](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Cloudflare: Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Cloudflare: Build image และเวอร์ชันเครื่องมือ](https://developers.cloudflare.com/pages/configuration/build-image/)
- [Cloudflare: Pages limits](https://developers.cloudflare.com/pages/platform/limits/)

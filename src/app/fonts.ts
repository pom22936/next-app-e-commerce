import { Sarabun, K2D, Kanit } from 'next/font/google'

const sarabun = Sarabun({
    subsets: ['thai'],
    weight: ['100','200','300', '400', '500', '600', '700', '800'],
    display: 'swap',
    variable: '--font-saraban', // ชื่อต้องตรงกับตัวแปรที่ตั่งใน globals.css
})

const k2d = K2D({
    subsets: ['thai'],
    weight: ['100','200','300', '400', '500', '600', '700', '800'],
    display: 'swap',
    variable: '--font-k2d', // ชื่อต้องตรงกับตัวแปรที่ตั่งใน globals.css
})

const kanit = Kanit({
    subsets: ['thai'],
    weight: ['100','200','300', '400', '500', '600', '700', '800'],
    display: 'swap',
    variable: '--font-kanit', // ชื่อต้องตรงกับตัวแปรที่ตั่งใน globals.css
})

export { sarabun, k2d, kanit }
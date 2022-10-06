import Link from "next/link";
import styles1 from './Footer.module.css'

export default function Footer() {
    return (
      <>
        <footer className={styles1.Foot}>
        <div className="Foot__container">
            <article >
                <h2>เกี่ยวกับ Ject Jobe</h2>
                <ul className='permalink'>
                    <li><Link href="#">เกี่ยวกับเรา</Link></li>
                    <li><Link href="#">นโยบายของเรา</Link></li>
                    <li><Link href="#">นโยบายความเป็นส่วนตัว</Link></li>
                    <li><Link href="#">Promotion</Link></li>
                    <li><Link href="/Seller/KYC/sellerKyc">Seller Centre</Link></li>
                    <li><Link href="#">ติดต่อออนไลน์</Link></li>
                </ul>
            </article>
            <article >
                <h2>วิธีชำระเงิน</h2>
                <ul className='permalink'>
                    <li><Link href="#">เกี่ยวกับเรา</Link></li>
                    <li><Link href="#">นโยบายของเรา</Link></li>
                    <li><Link href="#">นโยบายความเป็นส่วนตัว</Link></li>
                    <li><Link href="#">Promotion</Link></li>
                    <li><Link href="#">Seller Centre</Link></li>
                    <li><Link href="#">ติดต่อออนไลน์</Link></li>
                </ul>
            </article>
            <article>
                <h2>บริการจัดส่ง</h2>
                <ul className='permalink'>
                    <li><Link href="#">เกี่ยวกับเรา</Link></li>
                    <li><Link href="#">นโยบายของเรา</Link></li>
                    <li><Link href="#">นโยบายความเป็นส่วนตัว</Link></li>
                    <li><Link href="#">Promotion</Link></li>
                    <li><Link href="#">Seller Centre</Link></li>
                    <li><Link href="#">ติดต่อออนไลน์</Link></li>
                </ul>
            </article>
            </div>
        </footer>
      </>
      
    );
  }
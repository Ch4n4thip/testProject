import React, { useState, useEffect, useRef } from 'react'
import styles from './allProduct.module.css'
import Footer from "../../Footer/Footer"
import axios from 'axios';
import Navbar from '../../../Components/Navbar/nav';
import Link from 'next/link'
import Router from 'next/router'
import Image from 'next/image'
import { FiChevronLeft,FiChevronRight } from 'react-icons/fi'
import Head from 'next/head'

export default function ProductPage(){
    const [ listProduct, setListProduct ] = useState([])
    const [ allProduct, setAllProduct ] = useState([])
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ Max_Product_Per_Page, setMax_Product_Per_Page ] = useState(10)
    const [ maxPage, setMaxPage ] = useState(0)

    
   
    const getListProduct = async () => {
        const axiosURL = 'http://localhost:3000/api/allProduct'
        axios.get(axiosURL).then( (result) => {
            // setListProduct(result.data)
            setAllProduct(result.data)
        }).catch( (err)=> {
            // Localhost ios issus
            console.log(err)
            axios.get('/api/allProduct')
            .then( (result) => { 
                // setListProduct( result.data )
                console.log(result.data)
                setAllProduct(result.data)
            })
            .catch( (err) => {
                setListProduct( [{imgProduct: '', productName: err.message}] )
            })
        })
    }

    const changePageHandle = (event) => {
        if( ( event === -1 ) && ( currentPage > 1 )){
            setCurrentPage(currentPage-1)
        } else if( ( event === 1 ) && ( currentPage < maxPage )){
            setCurrentPage(currentPage+1)
        }
    }
    // [ First,1 get data ]
    useEffect( () => {
        getListProduct()
    }, [])
    // [ Then,2 calculate max page ]
    useEffect(()=>{
        setMaxPage( Math.ceil(allProduct.length/Max_Product_Per_Page))
        setCurrentPage(1)
    },[allProduct])
    // [ Last,3 show product when page change ]
    useEffect( ()=> {
        const arr = []
        var start = currentPage*Max_Product_Per_Page - Max_Product_Per_Page
        var stop = currentPage*Max_Product_Per_Page
        if( stop > allProduct.length ){
            stop = allProduct.length
        }
        for(let i = start; i<stop; i++){
            arr.push(allProduct[i])
        }
        setListProduct(arr)
        Router.push({
            pathname: '/Seller/Shop',
            query: { page: currentPage },
        })
    }, [currentPage, maxPage])
    
    return (
        
        <div>
            <Head>
                <title>Ject Jobe</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
        <div className={styles.container}>
            
            <div className={styles.contentContainer}>
                <div className={styles.productWrap}>
                    <div className={styles.pageTitle}>Product</div>
                    <div className={styles.topMenu}>
                        <button className={styles.addButton}><Link href='/Seller/addProduct'>Add Product</Link></button>
                        <input placeholder='Search...'/>
                    </div>
                    
                    <div className={styles.listProductContainer} id='listContainer'>
                        { (listProduct[0] === undefined) && <div>No product</div> }
                        {
                            (listProduct[0] != undefined) && listProduct.map( (element, index) => {
                                return (
                                    <div key={`item-${index}`} className={styles.itemContainer}>
                                        <Link href={`/Seller/Shop/${element.category}`}>
                                            <div className={styles.item}>
                                                
                                                <div className={styles.image}>  
                                                <Image  src={element.imgProduct[0]} alt='img' layout='fill' objectFit='contain' /> 
                                                    {/* <Image loader src={element.imgProduct} alt='img' layout='fill' objectFit='contain' /> */}
                                                </div>
                                                
                                                {/* <div className={styles.title}>{element.productName}</div> */}
                                                <div className={styles.title}>฿ {element.price}</div>
                                                <div className={styles.title}>{element.productName}</div>
                                                {/* <button className={styles.btn}>details</button> */}
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.pageButtonGroup}>
                        <button onClick={e => changePageHandle(-1) }><FiChevronLeft /></button>
                        <div className={styles.currentPageText}>
                            {currentPage}
                        </div>
                        <button onClick={e => changePageHandle(1) }><FiChevronRight /></button>
                    </div>
                </div>
            </div>
        
        </div>
        </div>
    )

}
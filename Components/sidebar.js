import Link from "next/link";
import React, { Component } from 'react'
import styles1 from '../styles/sidebar.module.css'
import { FaHome } from "react-icons/fa";
export default function sidebar()  {
    return (
        <nav className={styles1.Nav}>
        <ul>
          <li>
            <FaHome  size={60} color="white"/>
            
              
          </li>
          <li>
            <FaHome size={60} color="white"/>
              
              
          </li>
          <li>
            <FaHome size={60} color="white"/>
              
            
          </li>
          <li>
            <FaHome size={60} color="white"/>
              
              
          </li>
        </ul>
      </nav>
    )
  }



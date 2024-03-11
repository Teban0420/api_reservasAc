import React from 'react'
import {
  HomeOutlined,
  MenuOutlined 
} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;


export const PaginaInicio = () => {

    const {
        token: { colorBgContainer },
      } = theme.useToken();

    
    return(
        <Layout className="layout">
            
            {/* <Router_page /> */}

            
      {/* <Content
        style={{
          padding: '0 50px',
        }}
      >
        
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          Content
        </div>
      </Content> */}
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
         ©2023 Created by Esteban Giraldo
      </Footer>
    </Layout>
    )
}
import { Box } from "@mui/material";
import { ReactNode } from "react";


interface LayoutProps{
    children:ReactNode
}

const Layout = ({children}:LayoutProps)=>{
    return (
        
        <Box sx={{
            backgroundColor: "#FFFFFF",
            display:"flex",
            flexDirection:"column",            
            color:"#335C6E",
            padding:3,
            gap:3,
            overflowX:"hidden",
            height:"100vh",

        }} >
           
            <Box sx={{width:"100%"}}>{children}</Box>

        </Box>
    )

}
export default Layout;
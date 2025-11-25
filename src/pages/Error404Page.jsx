import { Header } from "../components/Header"
import ErrorLogo from "../assets/images/error-404.png"
import './Error404Page.css'

export function ErrorPage(){
    return(
        <>
            <title>Page Not Found</title>
            <Header />
            <div className="container">
                <img src={ErrorLogo} className="error-image"/>
                <h1 className="error-heading">Opps! Page not found</h1>
            </div>
        </>
    )
}
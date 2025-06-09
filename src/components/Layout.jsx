// The intent of layout function is to wrap our whole content
export default function Layout(props){

    const {children} = props;

    const header = (
        <header>
            <h1 className="text-gradient">The Brogram</h1>
            <p><strong>The 30 Simple Workout Program</strong></p>
        </header>
    );

    const footer = (
        <footer>
            <p>Built by <a href="https://abhisek7154.github.io/portfolio-website/" target="_blank">Abhisek</a> <br />Styled With <a 
            href="https://www.fantacss.smoljames.com/" target="_blank"> Fanta Css</a></p>
        </footer>
    );

    return(
        <>
        {header}
        {children}
        {footer}
        </>
    );
}
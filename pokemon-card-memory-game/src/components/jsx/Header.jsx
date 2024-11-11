import '../css/App.css'

function Header() {
    return (
        <header>
            <h1>Pokememory</h1>
            <h3>Get points by clicking on an image but don't click on any more than once!</h3>
            <div className="score-div">
                <h4>Score: 0</h4>
                <h4>Personal best: 0</h4>
            </div>
        </header>
    )
}

export default Header

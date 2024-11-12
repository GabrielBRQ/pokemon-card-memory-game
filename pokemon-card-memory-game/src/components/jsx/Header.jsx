import '../css/App.css'

function Header({score, bestScore}) {

    return (
        <header>
            <h1>Pokememory</h1>
            <h3>Get points by clicking on an image but don't click on any more than once!</h3>
            <div className="score-div">
                <h4>Score: {score}</h4>
                <h4>Personal best: {bestScore}</h4>
            </div>
        </header>
    )
}

export default Header

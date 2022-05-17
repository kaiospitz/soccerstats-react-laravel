import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/test" element={<Test />}></Route>
        </Routes>
    </BrowserRouter>
);

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <nav>
                <Link to="/">Home</Link> | <Link to="/test">Test</Link>
            </nav>
        </div>
    );
}

function Test() {
    return (
        <div>
            <h1>Test</h1>
            <nav>
                <Link to="/">Home</Link> | <Link to="/test">Test</Link>
            </nav>
        </div>
    );
}

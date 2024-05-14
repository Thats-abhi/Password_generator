import { useState,useCallback,useEffect,useRef } from "react";


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef= useRef(null);
  const passwordGenerator = useCallback(() => {
    console.log("Inside useCallback");
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "`~!@#$%^&*(){}?<>";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);

      setPassword(pass);
    }
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard=()=>{
     passwordRef.current?.select();//just for hilighting all text in passwordref not for actual selection.
    window.navigator.clipboard.writeText(password);
  }

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center mb-2">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 rounded-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="bg-blue-300 hover:bg-blue-600 overflow-hidden px-1 w-1/6 text-black hover:text-white ml-2 rounded-lg text-center pb-1 hover:shadow-inner" >
            Copy
          </button>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-x-1 mx-1">
            <input
              type="range"
              max={100}
              min={6}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="mx-2">Lenght: {length}</label>
          </div>

          <div className="flex items-center gap-x-1 mx-1">
            <input
              type="checkbox"
              id="num"
              defaultChecked={numberAllowed}
              value={numberAllowed}
              onChange={() =>
                setNumberAllowed((numberAllowed) => !numberAllowed)
              }
            />
            <label htmlFor="num">Number</label>
          </div>

          <div className="flex items-center gap-x-1 mx-1">
            <input
              type="checkbox"
              id="char"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((charAllowed) => !charAllowed)}
            />
            <label htmlFor="char">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

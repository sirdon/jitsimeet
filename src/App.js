import React from "react";

const App = () => {
  const jitsiContainerId = "jitsi-container-id";
  const [jitsi, setJitsi] = React.useState({});
  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve;
    });
    console.log("hello");
    const script = document.createElement("script");
    script.src = "reactJiti\jitiapp\src\components\jitsiApi.js";
    script.async = true;
    script.onload = resolveLoadJitsiScriptPromise
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  };
  const navigate = (link) =>{
    window.history.go('/')
  }
  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
      parentNode: document.getElementById(jitsiContainerId),
    });

    setJitsi(_jitsi)
    
  };

  React.useEffect(() => {
    initialiseJitsi();
    // jitsi.addEventListener('videoConferenceLeft', () => {
    //   navigate('/');
    // });
    return () => jitsi?.dispose?.();
  }, []);
  
  return <div id={jitsiContainerId} style={{ height: 720, width: "100%" }} />;
};

export default App; 
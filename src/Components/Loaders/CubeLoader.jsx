import React from "react";
import "./cubeLoader.css";
function CubeLoader() {
  return (
    <>
      <div class="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="spinnerTitle">Cargando...</p>
    </>
  );
}

export default CubeLoader;

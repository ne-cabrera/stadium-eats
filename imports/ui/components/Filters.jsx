import React from "react";

export class Filters extends React.Component {

  render() {
    return (
      <div>
        <div className="view-filters__content home-left-card">
          <div className="view-filters__header">
            <h1 className="tittle-filter">Filtros</h1>
          </div>
          <h2 className="view-filters__title">Comidas</h2>
          <div className="checkbox view-filters_checkbox">
            <input type="checkbox" className="hidden" name="categorias" />
            <label htmlFor="">
              Hola
          </label>
          </div>

        </div>
      </div>
    );
  }
}
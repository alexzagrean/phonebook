// Packages
import React, { FunctionComponent } from "react";
import { RouteProps, Routes, Route } from "react-router-dom";
import { HeaderComponent } from "./components/Header/HeaderComponent";

// Routes
import { routes } from "./routes";

export const App: FunctionComponent = (): JSX.Element => {
  const renderRoute = (): JSX.Element[] =>
    routes.map((routeProps: RouteProps, index: number): JSX.Element => <Route key={index} {...routeProps} />);

  const renderRoutes = (): JSX.Element => {
    return <Routes>{renderRoute()}</Routes>;
  };

  const renderLayout = (): JSX.Element => {
    return (
      <main>
        <HeaderComponent title="Agenda" />
        {renderRoutes()}
      </main>
    );
  };

  return renderLayout();
};

export default App;

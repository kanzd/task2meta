import Main from "../main/index";
import {render, screen} from "@testing-library/react";
import React from "react";

test("checking the render ",()=>{
    render(<Main />);
    const element = screen.getByTestId("whole")
    expect(element).toBeInTheDocument();
})

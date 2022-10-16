/**
 * @jest-environment jsdom
 */

import {render, RenderResult} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import ProfileComponent from "../../popup/components/Profile";
import {Profile} from "../../popup/models/Profile";
jest.mock("webextension-polyfill", () => {
  return;
});

describe("Profile component rendered correctly.", () => {
  let documentBody: RenderResult;
  const app =
        <BrowserRouter>
          <ProfileComponent
            onProfileChangeCallback={() => { }}
            profile={new Profile("Profile Name 1", "Profile Token 2", 0)}
          />
        </BrowserRouter>;
  beforeEach(() => {
    documentBody = render(app);
  });

  it("Apply button rendered properly", () => {
    expect(documentBody.getByTitle("Apply profile")).toBeInTheDocument();
  });


  it("Edit button rendered properly", () => {
    expect(documentBody.getByTitle("Edit")).toBeInTheDocument();
  });


  it("Delete button rendered properly", () => {
    expect(documentBody.getByTitle("Delete")).toBeInTheDocument();
  });

  it("Profile name showing properly.", () => {
    expect(documentBody.getByText("Profile Name 1")).toBeInTheDocument();
  });
});

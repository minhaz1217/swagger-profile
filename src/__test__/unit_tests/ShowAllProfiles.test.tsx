/**
 * @jest-environment jsdom
 */

import {render, screen, act} from "@testing-library/react";
import React from "react";
// import { act } from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";
import ShowAllProfiles from "../../popup/components/ShowAllProfiles";
import {Profile} from "../../popup/models/Profile";

jest.mock("webextension-polyfill", () => {
  return;
});
jest.mock("../../services/SwaggerProfileService", () => {
  return {
    getAllProfiles:
            jest
              .fn(() => {
                return Promise.resolve([new Profile("Name 1", "Token 1", 0),
                  new Profile("Name 2", "Token 2", 1),
                  new Profile("Name 3", "Token 3", 2)]);
                return Promise.resolve(null);
              }),
  };
});

test("ShowAllProfiles component rendering", async () => {
  // act(() => {
  render(
    <BrowserRouter>
      <ShowAllProfiles />
    </BrowserRouter>,
  );
  // });

  // All profiles text is showing
  expect(await screen.findByText("All Profiles")).toBeInTheDocument();

  // No profiles present text is showing.
  expect(await screen.findByText("No profiles are present, please add new profile.")).toBeInTheDocument();

  // Add new profile button is showing.
  expect(await screen.findByTitle("Add new profile")).toBeEnabled();
});

test("Profile Buttons are showing", async () => {
  act(() => {
    render(
      <BrowserRouter>
        <ShowAllProfiles />
      </BrowserRouter>,
    );
  });
  // First profile name is in the document
  expect(await screen.findByText("Name 1")).toBeInTheDocument();

  // Third profile name is in the document
  expect(await screen.findByText("Name 3")).toBeInTheDocument();

  // All 3 apply profile button is present
  expect((await screen.findAllByTitle("Apply profile")).length).toEqual(3);

  // All 3 edit button is present
  expect((await screen.findAllByTitle("Edit")).length).toEqual(3);

  // All 3 Copy to clipboard button is present
  expect((await screen.findAllByTitle("Copy to clipboard")).length).toEqual(3);
});

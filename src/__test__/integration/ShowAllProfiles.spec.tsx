/**
 * @jest-environment jsdom
 */

import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ShowAllProfiles from '../../popup/components/ShowAllProfiles';
import { Profile } from '../../popup/models/Profile';


jest.mock("webextension-polyfill", () => {
    return;
});

jest.mock("../../services/SwaggerProfileService", () => {
    return {
        getAllProfiles:
            jest
                .fn(() => {
                    return Promise.resolve(null);
                })
    };
});

describe('No profile found', () => {
    let documentBody: RenderResult;
    beforeEach(() => {
        const app =
            <BrowserRouter>
                <ShowAllProfiles />
            </BrowserRouter>;
        documentBody = render(app);
    });

    it("Rendered properly with title and button", () => {
        expect(documentBody.getByText('All Profiles')).toBeInTheDocument();
        expect(documentBody.getByTitle('Add new profile')).toBeInTheDocument();
    });
    it('Warning message showing about no profile.', () => {
        expect(documentBody.getByText('No profiles are present, please add new profile.')).toBeInTheDocument();
    });
});
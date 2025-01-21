# Swagger Profile

A firefox and chrome extension that will help you manage different bearer token profile for swagger.

# Motivation

When working with swagger, I had to keep track of 10+ different JWT token. I used to do that by saving all these in a file and copy pasting them when I need one of them. Another problem was that every time I had to reload the page the token would get removed and I would have to apply the token all over again.

So I made this extension to do all these. It can apply token in swagger UI page. Or it can copy to clipboard.

# Published
Firefox - [https://addons.mozilla.org/en-US/firefox/addon/swagger-token-manager/](https://addons.mozilla.org/en-US/firefox/addon/swagger-token-manager/)

Chrome - [https://chrome.google.com/webstore/detail/swagger-profile-manager/eglckgnbpfmpdjjljhgkolgpggfiknio](https://chrome.google.com/webstore/detail/swagger-profile-manager/eglckgnbpfmpdjjljhgkolgpggfiknio)

Edge - [https://microsoftedge.microsoft.com/addons/detail/swagger-profile-manager/kngkmecaajohnkfoadpiemcpoepdkbjh](https://microsoftedge.microsoft.com/addons/detail/swagger-profile-manager/kngkmecaajohnkfoadpiemcpoepdkbjh)

# Objectives/Challenges
I want to try different things for this project. As I've never started react, webpack, eslint, typescript and testing from scratch, this project will be about these also.
1. The main objective I want an extension that I will be able to manage my different swagger tokens (admin, client, manager, developer etc) with.
2. The extension should support both **firefox** and **chrome**.
3. Build the extension with basic html, bootstrap and js.
4. Integrate **react** with the project.
5. Integrate and configure **webpack** for the build process to work with an extension that uses react.
6. Make the extension fully working with only these constraints first.
7. Integrate and configure **eslint**.
8. Integrate **typescript** on this existing project.

# Images

* Apply token in with the click of a button

![Apply token in swagger](<images/01. apply token in swagger ui.png>)

* Manage multiple configuration

![manage multiple configuration](<images/02. view saved profiles.png>)

* Add profiles and token

![add profiles with token](<images/03. add profiles with token.png>)

* Copy token to clipboard

![Copy token to clipboard](<images/04. copy token to clipboard.png>)

* Update and delete profile

![update and delete profile](<images/05. edit and delete profile.png>)
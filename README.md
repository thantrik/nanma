# Overview

A collection of tools which used by a web developer. It can be installed as a chrome/edge plugin. Please create issues for new plugins.

> This plugin never connect to any thrid party site for push or fetch data other than github.
> No Analytics integrated with this extension.
> Completely under user control. I won't be knowing any errors about tools execution. So please create issues in github once you face any error.

### Status

In development, will publish once it complete

### How to build from source ?

> ```
>   git clone git@github.com:thantrik/nanma.git
>   cd nanma
>   yarn app:install
>   yarn build
> ```

    Creates a directory with version name mentioned in package.json
    Open chrome extension menu and load unpacked extension by selecting the build output directory

### How add a new plugin source ?

    Complete the code setup with required dependancies.

> ```
>   yarn new:plugin -- {plugin name}
> ```

Command will create a copy of plugin template with necessary files. Modify the created template.
import plugin in `ux\index.tsx` file

> ```
> import "./plugins/{plugin-name}";
> ```

### Architecture

Static Plug and play mode

### Plugins

| Name            | Status  | Size  | Developer | Remarks |
| --------------- | ------- | ----- | --------- | ------- |
| ❌awesome-links | pending | 300KB | krishna   |         |
| ❌chat          | pending | 300KB | krishna   |         |
| ❌clock         | pending | 300KB | krishna   |         |
| ✔️code          | pending | 300KB | krishna   |         |
| ❌csv-view      | pending | 300KB | krishna   |         |
| ❌dashboard     | pending | 300KB | krishna   |         |
| ✔️diff          | pending | 300KB | krishna   |         |
| ❌gifmaker      | pending | 300KB | krishna   |         |
| ❌github        | pending | 300KB | krishna   |         |
| ❌html          | pending | 300KB | krishna   |         |
| ❌icon-maker    | pending | 300KB | krishna   |         |
| ✔️json          | pending | 300KB | krishna   |         |
| ❌live-code     | pending | 300KB | krishna   |         |
| ❌my-data       | pending | 300KB | krishna   |         |
| ❌my-web        | pending | 300KB | krishna   |         |
| ❌offline-doc   | pending | 300KB | krishna   |         |
| ❌performance   | pending | 300KB | krishna   |         |
| ❌photo-edit    | pending | 300KB | krishna   |         |
| ❌prettier      | pending | 300KB | krishna   |         |
| ❌read-later    | pending | 300KB | krishna   |         |
| ❌rich-text     | pending | 300KB | krishna   |         |
| ❌snippets      | pending | 300KB | krishna   |         |
| ❌svg-edit      | pending | 300KB | krishna   |         |
| ❌timer         | pending | 300KB | krishna   |         |
| ❌timezone      | pending | 300KB | krishna   |         |
| ❌todo          | pending | 300KB | krishna   |         |
| ❌unicode       | pending | 300KB | krishna   |         |
| ❌url           | pending | 300KB | krishna   |         |
| ❌vscode        | pending | 300KB | krishna   |         |
| ❌web-server    | pending | 300KB | krishna   |         |
| ❌md-editor     | pending | 300KB | krishna   |         |
| ❌table-gen     | pending | 300KB | krishna   |         |

#### Code (in progress)

    Code viewer, while accessing web links, code viewer will format code based on extensions

#### Awesome links (pending)

    Store & Manage all links which developer found as awesome tools

#### CSV (pending)

    CSV will be viewable as Excel instead of text

#### Dashboard (pending)

    View and manage plugins

#### diff (pending)

    View code diff, text diff

#### Gif Maker (pending)

    create dynamic gif images (loading etc)

#### Github (pending)

    Octree, custom github pages

#### Html (pending)

    Live HTML editor

#### Icon-maker (pending)

    .ico image, 16,32 bit icon maker

#### Json (in progress)

    JSON viewer and editor

#### live code (pending)

    Live code editor between peer to peer connected in same network

#### my data (pending)

    To Store some personal data in encrypted space

#### my web (pending)

    Custom style, javascript snippets to run while accessing the respective website
    eg: I want to modify my facebook. I just need to add some custom styling. it will inject to facebook while accessing

#### performance (pending)

    Analyse performance of website without opening dev tools

#### photo-edit (pending)

    Image editor

#### prettier (pending)

    Code prettier

#### read-later (pending)

    Same as offline-doc

#### Rich Text (pending)

    Rich text editor

#### Snippets (pending)

    Javascript code snippets to execute with form inputs

#### SvgEdit (pending)

    SVG Editor

#### Timer (pending)

    Timer
    Task Timer
    Beep Timer

#### Todo (pending)

    Todo app with static calender

#### Unicode (pending)

    Unicode table

#### Vscode (pending)

    File editor for scoped directories

#### Web Server (pending)

    Run a local webserver from give directory in a local port

#### TCP Chat (pending)

    TCP/IP, UDP based chat, file transfer etc.

#### Markdown Editor (pending)

    Markdown and preview

#### Table-gen (pending)

    Table generator

#### UI Collection (pending)

    I component library collection

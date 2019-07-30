
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';


const template = html`
<iron-iconset-svg name="admin" size="24">
    <svg>
        <defs>
            <g id="menu"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></g>       
        </defs>
    </svg>
</iron-iconset-svg>`;

document.head.appendChild(template.content);
window.customElements.define('admin-icons', class AdminIcons extends HTMLElement {});

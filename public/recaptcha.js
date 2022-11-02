class WBG_Recaptcha {

    constructor(data) {
        this.container = document.getElementById(data.container_id);
        this.type = data.type;
        this.public_key = data.public_key;
        this.style = data.style;
        this.second_style = data.second_style;
        this.verification = false;

        if (!this.container)
            throw "Container not found. Please create a container or provide a container id.";
        if (!this.type)
            throw "Service type not provided. Please provide a service type.";
        if (!this.public_key)
            throw "Public key not provided. Please provide a public key.";


        if (!this.servicesTypes().includes(this.type))
            throw `The service type ${this.type} is not supported. Please provide a supported service type.`;

        if (!this.styleTypes().includes(this.style))
            throw `The style type ${this.style} is not supported. Please provide a supported style type.`;

        if (!this.second_style) {
            if (this.style === "dark")
                this.second_style = "light";
            else if (this.style === "light")
                this.second_style = "dark";
        }
        this.render(this.container);
        this.verification_container = document.getElementById("wbg-captcha-verification-container");
        document.getElementById("wbg-captcha-button").addEventListener('click', this.handleClick);
    }

    verificationReload = (e) => {
        let button = document.getElementById("wbg-captcha-button");
        let reload_button = document.getElementById("wbg-captcha-verification-reload");
        reload_button.disabled = true;
        this.verification = false;
        this.handleClick(null,true);
    }

    handleClick = (e,reload) => {
        let button = document.getElementById("wbg-captcha-button");
        if(this.verification)
            this.verification_container.classList.toggle('wbg-show')
        if(!this.verification) {
            button.disabled = true;
            button.innerHTML = this.iconLoading();
            button.getElementsByTagName('svg')[0].animate([
                {transform: 'rotate(360deg)'},
            ], {
                duration: 1000,
                iterations: Infinity
            });
            fetch(`https://api.webguard.pl/v1/captcha/${this.public_key}/generate`, {
                method: "POST",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {})
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById("wbg-captcha-verification-token").value = data.data.token;
                    if (data.data.image) {
                        button.innerHTML = this.iconVerificationIsNeeded();
                        this.renderVerification(data.data.image, data.data.token, reload);
                        button.disabled = false;
                        this.verification = true;
                        document.getElementById("wbg-captcha-verification-reload").addEventListener('click', this.verificationReload);
                    } else {
                        this.renderInvisible(data.data.access_token);
                        button.innerHTML = this.iconSuccess();
                        button.getElementsByTagName('svg')[0].animate([
                            {transform: 'scale(1)'},
                            {transform: 'scale(1.2)'},
                            {transform: 'scale(1)'},
                        ], {
                            duration: 500,
                            iterations: 1
                        });
                    }
                });
        }
    }

    renderVerification = (image,token,reload = false) => {
        if(!reload)
            this.verification_container.classList.toggle('wbg-show')
        this.verification_container.innerHTML = `
        <img alt="" src="${image}"/>
        <div class="wbg-captcha-verification-input-container">
       <span> Przepisz kod z obrazka:</span>
        <input class="wbg-captcha-verification-input wbg-captcha-bg-${this.second_style}" id="wbg-captcha-verification-input" name="wbg-captcha-verification-input" type="text"/>
       <button  type="button" id="wbg-captcha-verification-reload"> ${this.iconLoading()}</button>
</div>

`;
    }



    renderInvisible = (access_token) => {
        this.verification_container.innerHTML = `<input type="hidden" name="wbg-captcha-verification-input" value="${access_token}"/>`
    }
    render = (container) => {
        container.innerHTML =
            `<div class="wbg-captcha-container wbg-captcha-bg-${this.style}">
                  <button id="wbg-captcha-button" class="wbg-captcha-button wbg-captcha-button-${this.second_style}" type="button">
                      ${this.iconCheck()}
                  </button>
                  <div class="wbg-captcha-text">
                      Nie jestem robotem
                  </div>
                  <div class="wbg-captcha-logo">
                      <svg xmlns="http://www.w3.org/2000/svg" width="19.46px" height="17.9px">
                          <polygon class="st0" points="0,9.19 9.7,13.3 19.46,9.19 19.46,11.11 9.73,15.28 0,11.11 "/>
                          <path class="st0"
                                d="M0,0l2.27,0.96v6.56l1.22,0.5V4.65l2.32,1.02v3.36l1.27,0.54V3.02l2.34,1c-0.01,4.92,0,8.44,0,8.44 S5.62,10.91,0,8.48V0z"/>
                          <polygon class="st0"
                                   points="9.96,3.96 19.46,0.02 19.46,8.36 9.96,12.46 9.96,7.09 15.86,4.58 15.89,6.6 12.32,8.06 12.33,9.51 17.01,7.47 17.01,2.89 9.96,5.9 "/>
                          <polygon class="st0" points="0,11.77 9.77,15.91 19.46,11.83 19.46,13.76 9.8,17.9 0,13.7 "/>
                      </svg>
                  </div>
              </div>
              <input type="hidden" id="wbg-captcha-verification-token"  name="wbg-captcha-verification-token" value=""/>
              <div id="wbg-captcha-verification-container" class="wbg-captcha-verification-container wbg-captcha-bg-${this.second_style}" >

              </div>


`;
    }


    iconCheck = () => {
        return '<svg x="0px" y="0px"  width="10.71px" height="7.98px" viewBox="0 0 10.71 7.98" xml:space="preserve"> <path d="M3.64,7.83L0.16,4.35c-0.21-0.21-0.21-0.55,0-0.76l0.76-0.76c0.21-0.21,0.55-0.21,0.76,0l2.34,2.34l5.02-5.02c0.21-0.21,0.55-0.21,0.76,0l0.76,0.76c0.21,0.21,0.21,0.55,0,0.76L4.39,7.83C4.18,8.04,3.85,8.04,3.64,7.83L3.64,7.83z"/></svg>';
    }

    iconLoading = () => {
        return `<svg  aria-hidden="true"  width="10px" height="10px" role="img" xml:space="preserve" viewBox="0 0 512 512"><path fill="currentColor" d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path></svg>`;
    }

    iconSuccess = () => {
        return `<svg x="0px" y="0px" width="132.14px" height="139.63px" viewBox="0 0 132.14 139.63"> <path d="M130.41,30.82c-0.36-1.22-0.9-2.38-1.47-3.52l-0.25-0.49c-0.98-1.93-2.64-3.44-4.66-4.23L70.76,0.65 C69.72,0.22,68.6,0,67.48,0h-2.19c-1.34,0-2.66,0.26-3.9,0.77L8.49,22.41c-2.32,0.91-4.27,2.56-5.55,4.7 c-0.95,1.6-1.61,3.34-2.12,5.35c-0.97,3.87-1.05,7.92-0.42,11.86l2.58,16.31c0.68,4.3,1.8,8.52,3.34,12.59 c2.1,5.52,4.72,13.86,7.92,19.58c0.22,0.4,0.47,0.78,0.73,1.15l6.22,10.08c3.29,5.59,11.01,14.84,15.75,19.1l9.38,7.69 c4.25,2.91,10.88,6.9,16.71,8.4c2.3,0.59,4.72,0.51,7.01-0.11l0,0c1.94-0.52,3.83-1.25,5.56-2.27c1.11-0.66,2.06-1.54,3.16-2.22 c7.83-4.85,30.79-27.82,36.26-35.87l6.85-12.23c2.6-4.52,3.79-10.82,5.85-16.23l3.89-21.07C132.73,43.09,131.95,36.02,130.41,30.82z  M111.94,56.34L61.5,106.78c-1.71,1.71-4.49,1.71-6.2,0L26.79,78.27c-1.71-1.71-1.71-4.49,0-6.2l6.2-6.2c1.71-1.71,4.49-1.71,6.2,0 l19.2,19.2l41.13-41.13c1.71-1.71,4.49-1.71,6.2,0l6.2,6.2C113.65,51.85,113.65,54.63,111.94,56.34z"/></svg>`;
    }

    iconVerificationIsNeeded = () => {
        return `<svg  role="img"  viewBox="0 0 576 512"><path fill="currentColor" d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path></svg>`;
    }

    iconSad = () => {

    }


    servicesTypes = () => {
        return [
            'text'
        ];
    }

    styleTypes = () => {
        return [
            'dark',
            'light'
        ];
    }
}

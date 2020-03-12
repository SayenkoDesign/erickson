<?php


function get_svg( $type = '' ) {

	$svgs = array(

		'youtube-play' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M506.703 145.655s-5.297-37.959-20.303-54.731c-19.421-22.069-41.49-22.069-51.2-22.952-71.503-5.296-179.2-6.179-179.2-6.179s-107.697.883-179.2 6.179c-9.71.883-31.779 1.766-51.2 22.952-15.89 16.773-20.303 54.731-20.303 54.731S0 190.676 0 235.697v41.49c0 45.021 5.297 89.159 5.297 89.159s5.297 37.959 20.303 54.731c19.421 22.069 45.021 21.186 56.497 23.835C122.703 449.324 256 450.207 256 450.207s107.697 0 179.2-6.179c9.71-.883 31.779-1.766 51.2-22.952 15.007-16.772 20.303-54.731 20.303-54.731S512 321.324 512 277.186v-41.49c0-45.02-5.297-90.041-5.297-90.041" fill="#d8362a"/><path fill="#fff" d="M194.207 166.841V358.4l167.724-93.572z"/></svg>',

        'posts-icon' => '<svg height="52" viewBox="0 0 39 52" width="39" xmlns="http://www.w3.org/2000/svg"><g fill="#e9731f" transform=""><path d="m37.6169999 10.416h-5.2939998v-4.26750003c0-.56549991-.4585001-1.024-1.024-1.024h-3.148v-.886c0-2.34099994-1.8975001-4.23849997-4.2385001-4.23849997-2.3405 0-4.238 1.89750003-4.238 4.23849997v.886h-18.59949994c-.56550003 0-1.024.45850009-1.024 1.024v39.21950003c0 .5655.45849997 1.024 1.024 1.024h5.29349991v4.27c0 .5655.45850009 1.024 1.024 1.024h30.22449993c.5655001 0 1.0240018-.4585 1.0240018-1.024v-39.2195c.0004983-.272-.1070017-.533-.2990017-.7255001-.192-.1924999-.4530001-.3009999-.7250001-.3009999zm-7.3419998-3.24350003v3.24550003h-2.124v-3.24550003zm-8.5505001-2.93249997c0-1.21.9804999-2.19049997 2.1905001-2.19049997 1.2094999 0 2.1899998.98049997 2.1899998 2.19049997v.88449997h-1.168v-.75150003c0-.56549991-.4579998-1.024-1.024-1.024-.5654999 0-1.024.45850009-1.024 1.024v.75150003h-1.1659998zm-19.62549994 40.104v-37.17150003h24.00400004v3.24550003h-18.71050013c-.56549991 0-1.024.4585-1.024 1.024v32.902zm34.49349994 5.294h-28.17600003v-37.1715h17.68650013v2.0995c0 .5655.4584999 1.024 1.024 1.024.5654999 0 1.024-.4585 1.024-1.024v-2.0995h8.4419998z"/><path d="m12.1405 20.0125h6.5145001c.5654999 0 1.024-.4585 1.024-1.024 0-.5654999-.4585001-1.024-1.024-1.024h-6.5145001c-.566 0-1.024.4585001-1.024 1.024 0 .5655.458 1.024 1.024 1.024z"/><path d="m11.1165 27.356c0 .5655.458 1.024 1.024 1.024h20.7284999c.5655001 0 1.024-.4585 1.024-1.024s-.4584999-1.024-1.024-1.024h-20.7284999c-.566 0-1.024.4585-1.024 1.024z"/><path d="m32.8689999 31.6875h-20.7284999c-.566 0-1.024.4585-1.024 1.024 0 .5654999.458 1.024 1.024 1.024h20.7284999c.5655001 0 1.024-.4585001 1.024-1.024 0-.5655-.4584999-1.024-1.024-1.024z"/><path d="m32.8689999 37.0430001h-20.7284999c-.566 0-1.024.4584999-1.024 1.024 0 .5654999.458 1.024 1.024 1.024h20.7284999c.5655001 0 1.024-.4585001 1.024-1.024 0-.5655001-.4584999-1.024-1.024-1.024z"/><path d="m32.8689999 42.398h-20.7284999c-.566 0-1.024.4585-1.024 1.024s.458 1.024 1.024 1.024h20.7284999c.5655001 0 1.024-.4585 1.024-1.024s-.4584999-1.024-1.024-1.024z"/></g></svg>',
        
        'gallery-icon' => '<svg height="54" viewBox="0 0 62 54" width="62" xmlns="http://www.w3.org/2000/svg"><g fill="#e9731f" transform=""><path d="m30.9478372 18.9867378c-3.4427205 0-6.2337431 2.7908806-6.2337431 6.2337432 0 3.4427205 2.7908806 6.2337431 6.2337431 6.2337431 3.4427205 0 6.2337432-2.7908806 6.2337432-6.2337431 0-3.4428626-2.7908806-6.2337432-6.2337432-6.2337432zm0 9.4989087c-1.8033906 0-3.2653075-1.4619169-3.2653075-3.2653076 0-1.8033906 1.4619169-3.2653075 3.2653075-3.2653075 1.8033907 0 3.2653076 1.4619169 3.2653076 3.2653075 0 1.8033907-1.4619169 3.2653076-3.2653076 3.2653076z"/><path d="m55.8085207 4.73816182-40.5190462-4.60094731c-1.5725692-.22357726-3.1658768.23550896-4.3783644 1.26163484-1.21234555.94004721-1.98946829 2.33349888-2.15210868 3.85890943l-.74203787 6.08530712h-2.30068672c-3.26530755 0-5.71428821 2.8941466-5.71428821 6.1594542v30.3521046c-.08224348 3.1137466 2.37525982 5.7047713 5.48914846 5.7870148.07499924.0019365.15014051.0019365.22513975.0019365h40.74162917c3.2653076 0 6.2337432-2.5236437 6.2337432-5.7889513v-1.1873458c1.0123476-.1955946 1.9727071-.5999939 2.8199996-1.1873458 1.2024025-1.0123476 1.972281-2.4459978 2.1521087-4.0073454l3.4137435-30.1295218c.3480078-3.27283585-2.0006898-6.21698191-5.2689803-6.60490408zm-6.0851651 43.11646288c0 1.6326538-1.6327958 2.8199996-3.2654496 2.8199996h-40.74162917c-1.47484289.0433235-2.70551213-1.1171761-2.74883556-2.5920189-.0022727-.0759936-.00118575-.1519871.00298293-.2279807v-5.4915632l11.5027234-8.4599988c1.3818041-1.0609266 3.328091-.9666094 4.6010893.222583l8.0889799 7.124217c1.2283965 1.0313815 2.7746876 1.6079381 4.3785064 1.6326537 1.2539645.0153408 2.4873326-.3186047 3.5621795-.9647628l14.6194529-8.4599988zm-.000142-17.8847604-16.1779597 9.4247616c-1.3891904.823003-3.1475531.6739988-4.3785064-.3710189l-8.1631269-7.198506c-2.3396067-2.0103488-5.7591741-2.133643-8.2374158-.296872l-9.7957806 7.124217v-21.1499259c0-1.6326538 1.11319885-3.1910186 2.74585263-3.1910186h40.74162917c1.7443004.0723004 3.1529508 1.4489909 3.2653076 3.1910186zm8.3886927-19.0275045c-.0009943.009801-.0018466.0197441-.0029829.0295452l-3.4878905 30.1295217c.0059658.781242-.3502805 1.5211492-.9647629 2.0036727-.296872.296872-.9647629.4453079-.9647629.5937439v-26.1963232c-.1171863-3.3807894-2.8518174-6.0828924-6.2337431-6.1594542h-35.4725069l.6678909-5.78843515c.1448849-.7495662.5367843-1.42882063 1.1131988-1.92952574.6508457-.4499954 1.4377694-.6597944 2.2263978-.59374393l40.4448993 4.67523632c1.6318015.15497001 2.8292324 1.6036768 2.6742624 3.2357624z"/></g></svg>',
        /*
        'gallery-icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="62" height="54" viewBox="0 0 62 54">
  <g fill="#E9731F" fill-rule="nonzero">
    <path d="M30.948 18.987a6.234 6.234 0 100 12.467 6.234 6.234 0 000-12.467zm0 9.499a3.265 3.265 0 110-6.531 3.265 3.265 0 110 6.53z"/>
    <path d="M55.809 4.738l-40.52-4.6a5.565 5.565 0 00-4.378 1.26 5.64 5.64 0 00-2.152 3.86l-.742 6.085h-2.3c-3.266 0-5.715 2.894-5.715 6.16v30.352a5.64 5.64 0 005.714 5.789h40.742c3.265 0 6.234-2.524 6.234-5.79v-1.187a7.42 7.42 0 002.82-1.187 6.16 6.16 0 002.152-4.007l3.414-30.13a6.011 6.011 0 00-5.27-6.605zm-6.086 43.117c0 1.632-1.632 2.82-3.265 2.82H5.716a2.672 2.672 0 01-2.746-2.82v-5.492l11.503-8.46a3.562 3.562 0 014.601.223l8.09 7.124a6.976 6.976 0 004.378 1.633 6.753 6.753 0 003.562-.965l14.62-8.46v14.397zm0-17.885l-16.178 9.425a3.785 3.785 0 01-4.378-.371l-8.163-7.199a6.605 6.605 0 00-8.238-.297L2.97 38.652v-21.15c0-1.632 1.114-3.19 2.746-3.19h40.742a3.414 3.414 0 013.265 3.19V29.97zm8.389-19.028l-.003.03-3.488 30.13a2.523 2.523 0 01-.965 2.003c-.297.297-.964.445-.964.594V17.503a6.382 6.382 0 00-6.234-6.16H10.985l.668-5.788a3.414 3.414 0 011.113-1.93c.651-.45 1.438-.66 2.227-.594l40.445 4.676a2.968 2.968 0 012.674 3.235z"/>
  </g>
</svg>',
*/

        'search-icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="52" viewBox="0 0 44 52">
  <g fill="#E9731F" fill-rule="nonzero">
    <path d="M42.33 0H7.272a1.02 1.02 0 00-1.02 1.02v34.903L1.02 41.156a3.319 3.319 0 000 4.688c.647.646 1.495.969 2.344.969.85 0 1.698-.323 2.344-.97l.545-.544v4.881c0 .563.457 1.02 1.02 1.02h26.656c.27 0 .53-.108.721-.299l8.4-8.4a1.02 1.02 0 00.299-.72V1.02A1.02 1.02 0 0042.329 0zM4.265 44.401a1.276 1.276 0 01-1.803 0 1.276 1.276 0 010-1.803l9.772-9.772 1.803 1.803L4.266 44.4zm30.681 3.319l-.004-4.926 4.926.004-4.922 4.922zm6.362-6.96l-7.386-.007h-.001a1.02 1.02 0 00-1.02 1.02l.007 7.387H8.293V43.26l7.909-7.909a1.02 1.02 0 000-1.442l-.933-.933 1.95-1.95a12.031 12.031 0 007.735 2.806c6.665 0 12.086-5.422 12.086-12.086 0-6.664-5.422-12.086-12.086-12.086-6.664 0-12.086 5.422-12.086 12.086 0 2.992 1.093 5.733 2.9 7.846l-1.942 1.941-.87-.87a1.02 1.02 0 00-1.442 0l-3.22 3.221V2.04h33.015v38.72zM14.908 21.745c0-5.54 4.507-10.046 10.046-10.046C30.494 11.7 35 16.206 35 21.745c0 5.54-4.506 10.046-10.046 10.046-5.54 0-10.046-4.506-10.046-10.046z"/>
    <path d="M30.717 20.776H19.294a1.02 1.02 0 000 2.04h11.423a1.02 1.02 0 000-2.04zM30.717 24.754H19.294a1.02 1.02 0 000 2.04h11.423a1.02 1.02 0 100-2.04zM23.883 16.697h-4.59a1.02 1.02 0 000 2.04h4.59a1.02 1.02 0 000-2.04zM27.555 16.697h-.612a1.02 1.02 0 000 2.04h.612a1.02 1.02 0 000-2.04z"/>
  </g>
</svg>',
        
		'advantage-icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="46" height="55" viewBox="0 0 46 55">
          <g fill="#E9731F" fill-rule="nonzero">
            <path d="M18.787 8.78c-7.74 2.223-12.21 10.3-9.988 18.038a.911.911 0 001.752-.504 12.756 12.756 0 01-.01-7.008c1.925-6.777 8.98-10.71 15.757-8.785 6.777 1.926 10.71 8.98 8.785 15.758a.911.911 0 001.753.498c.744-2.618.74-5.393-.012-8.01-2.223-7.738-10.299-12.21-18.037-9.987zM31.833 30.511a.912.912 0 10-1.29 1.29l1.289 1.287c.17.17.402.267.644.267v.001a.91.91 0 00.644-1.555l-1.287-1.29zM35.103 28.825l-1.577-.912a.911.911 0 00-.912 1.579l1.578.91a.911.911 0 00.911-1.578zM15.08 30.511a.912.912 0 00-1.29 0L12.504 31.8a.911.911 0 001.288 1.288l1.29-1.287a.912.912 0 000-1.29zM13.02 29.485a.911.911 0 00-.922-1.572l-1.578.912a.911.911 0 00.456 1.7c.16 0 .317-.042.456-.122l1.577-.911a.896.896 0 00.01-.007z"/>
            <path d="M45.357 22.17l-3.95-4.375 1.237-5.761a.911.911 0 00-.611-1.059l-5.61-1.806-1.806-5.61a.911.911 0 00-1.059-.612l-5.762 1.237-4.374-3.95a.911.911 0 00-1.22 0l-4.374 3.95-5.762-1.237a.911.911 0 00-1.059.612l-1.806 5.61-5.61 1.805a.911.911 0 00-.611 1.059l1.236 5.762-3.95 4.374a.911.911 0 000 1.221l3.95 4.374-1.236 5.761a.911.911 0 00.61 1.06l4.244 1.366a.91.91 0 00-.254.279L.71 48.13a.911.911 0 001.026 1.335l6.581-1.768 1.769 6.591a.911.911 0 001.67.22l6.842-11.855a.897.897 0 00.106-.487l3.497 3.159a.911.911 0 001.221 0l3.497-3.159a.897.897 0 00.106.487l6.843 11.855a.911.911 0 001.67-.22l1.768-6.59 6.582 1.767a.911.911 0 001.026-1.336l-6.87-11.9a.911.911 0 00-.254-.279l4.243-1.367a.911.911 0 00.611-1.058l-1.236-5.761 3.949-4.374a.911.911 0 000-1.22zM17.02 41.741l-5.742 9.95-1.435-5.348a.911.911 0 00-1.116-.644h-.001L3.39 47.134l5.77-9.994a.897.897 0 00.099-.571L11.006 42a.911.911 0 001.06.61l5.164-1.107a.877.877 0 00-.21.238zm25.215 5.394L36.899 45.7a.911.911 0 00-1.117.643v.001l-1.435 5.348-5.74-9.95a.88.88 0 00-.21-.238l5.163 1.108A.911.911 0 0034.62 42l1.748-5.434a.896.896 0 00.099.573l5.768 9.996zm-2.492-20.247a.911.911 0 00-.214.802l1.16 5.412-5.27 1.695a.911.911 0 00-.59.589l-1.695 5.27-5.41-1.16a.902.902 0 00-.803.214l-4.11 3.71-4.109-3.71a.911.911 0 00-.802-.214l-5.411 1.16-1.696-5.27a.911.911 0 00-.589-.59l-5.27-1.695 1.16-5.411a.911.911 0 00-.213-.802l-3.71-4.11 3.71-4.109a.911.911 0 00.214-.802l-1.16-5.411 5.27-1.696a.911.911 0 00.589-.589l1.696-5.27 5.41 1.16a.898.898 0 00.802-.213l4.11-3.71 4.11 3.71a.896.896 0 00.801.214l5.412-1.16 1.696 5.27c.09.28.309.499.588.589l5.27 1.696-1.16 5.41a.911.911 0 00.214.802l3.71 4.11-3.71 4.11z"/>
            <path d="M27.23 35.748l-.473-1.76a.911.911 0 00-1.76.47l.472 1.762a.911.911 0 001.76-.472zM29.524 32.583a.911.911 0 10-1.579.911l.912 1.578a.911.911 0 001.578-.912l-.911-1.577zM19.987 33.341a.911.911 0 00-1.116.644l-.472 1.761a.911.911 0 00.644 1.116.911.911 0 001.116-.644l.472-1.761a.911.911 0 00-.644-1.116zM17.345 32.25a.911.911 0 00-1.245.333l-.911 1.578a.911.911 0 101.572.921l.006-.01.911-1.578a.911.911 0 00-.333-1.244zM22.812 33.714a.911.911 0 00-.911.911v1.823a.911.911 0 001.822 0v-1.823a.911.911 0 00-.911-.91z"/>
          </g>
        </svg>',
        
        'best-seller-icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="46" height="55" viewBox="0 0 46 55">
  <g fill="#E9731F" fill-rule="nonzero">
    <path d="M18.787 8.78c-7.74 2.223-12.21 10.3-9.988 18.038a.911.911 0 001.752-.504 12.756 12.756 0 01-.01-7.008c1.925-6.777 8.98-10.71 15.757-8.785 6.777 1.926 10.71 8.98 8.785 15.758a.911.911 0 001.753.498c.744-2.618.74-5.393-.012-8.01-2.223-7.738-10.299-12.21-18.037-9.987zM31.833 30.511a.912.912 0 10-1.29 1.29l1.289 1.287c.17.17.402.267.644.267v.001a.91.91 0 00.644-1.555l-1.287-1.29zM35.103 28.825l-1.577-.912a.911.911 0 00-.912 1.579l1.578.91a.911.911 0 00.911-1.578zM15.08 30.511a.912.912 0 00-1.29 0L12.504 31.8a.911.911 0 001.288 1.288l1.29-1.287a.912.912 0 000-1.29zM13.02 29.485a.911.911 0 00-.922-1.572l-1.578.912a.911.911 0 00.456 1.7c.16 0 .317-.042.456-.122l1.577-.911a.896.896 0 00.01-.007z"/>
    <path d="M45.357 22.17l-3.95-4.375 1.237-5.761a.911.911 0 00-.611-1.059l-5.61-1.806-1.806-5.61a.911.911 0 00-1.059-.612l-5.762 1.237-4.374-3.95a.911.911 0 00-1.22 0l-4.374 3.95-5.762-1.237a.911.911 0 00-1.059.612l-1.806 5.61-5.61 1.805a.911.911 0 00-.611 1.059l1.236 5.762-3.95 4.374a.911.911 0 000 1.221l3.95 4.374-1.236 5.761a.911.911 0 00.61 1.06l4.244 1.366a.91.91 0 00-.254.279L.71 48.13a.911.911 0 001.026 1.335l6.581-1.768 1.769 6.591a.911.911 0 001.67.22l6.842-11.855a.897.897 0 00.106-.487l3.497 3.159a.911.911 0 001.221 0l3.497-3.159a.897.897 0 00.106.487l6.843 11.855a.911.911 0 001.67-.22l1.768-6.59 6.582 1.767a.911.911 0 001.026-1.336l-6.87-11.9a.911.911 0 00-.254-.279l4.243-1.367a.911.911 0 00.611-1.058l-1.236-5.761 3.949-4.374a.911.911 0 000-1.22zM17.02 41.741l-5.742 9.95-1.435-5.348a.911.911 0 00-1.116-.644h-.001L3.39 47.134l5.77-9.994a.897.897 0 00.099-.571L11.006 42a.911.911 0 001.06.61l5.164-1.107a.877.877 0 00-.21.238zm25.215 5.394L36.899 45.7a.911.911 0 00-1.117.643v.001l-1.435 5.348-5.74-9.95a.88.88 0 00-.21-.238l5.163 1.108A.911.911 0 0034.62 42l1.748-5.434a.896.896 0 00.099.573l5.768 9.996zm-2.492-20.247a.911.911 0 00-.214.802l1.16 5.412-5.27 1.695a.911.911 0 00-.59.589l-1.695 5.27-5.41-1.16a.902.902 0 00-.803.214l-4.11 3.71-4.109-3.71a.911.911 0 00-.802-.214l-5.411 1.16-1.696-5.27a.911.911 0 00-.589-.59l-5.27-1.695 1.16-5.411a.911.911 0 00-.213-.802l-3.71-4.11 3.71-4.109a.911.911 0 00.214-.802l-1.16-5.411 5.27-1.696a.911.911 0 00.589-.589l1.696-5.27 5.41 1.16a.898.898 0 00.802-.213l4.11-3.71 4.11 3.71a.896.896 0 00.801.214l5.412-1.16 1.696 5.27c.09.28.309.499.588.589l5.27 1.696-1.16 5.41a.911.911 0 00.214.802l3.71 4.11-3.71 4.11z"/>
    <path d="M27.23 35.748l-.473-1.76a.911.911 0 00-1.76.47l.472 1.762a.911.911 0 001.76-.472zM29.524 32.583a.911.911 0 10-1.579.911l.912 1.578a.911.911 0 001.578-.912l-.911-1.577zM19.987 33.341a.911.911 0 00-1.116.644l-.472 1.761a.911.911 0 00.644 1.116.911.911 0 001.116-.644l.472-1.761a.911.911 0 00-.644-1.116zM17.345 32.25a.911.911 0 00-1.245.333l-.911 1.578a.911.911 0 101.572.921l.006-.01.911-1.578a.911.911 0 00-.333-1.244zM22.812 33.714a.911.911 0 00-.911.911v1.823a.911.911 0 001.822 0v-1.823a.911.911 0 00-.911-.91z"/>
  </g>
</svg>',
        
        'featured-post-icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="62" viewBox="0 0 50 62">
            <g fill="#E9731F" fill-rule="nonzero">
              <path d="M36.983 12.885a16.934 16.934 0 00-11.897-5.063c-4.57-.06-8.889 1.684-12.166 4.909-3.275 3.223-5.086 7.512-5.1 12.077A17.04 17.04 0 0013.658 37.7c2.696 2.354 4.242 5.702 4.242 9.183v8.597a5.967 5.967 0 005.96 5.96h2a5.967 5.967 0 005.96-5.96v-8.486c0-3.582 1.517-6.944 4.162-9.224A17.033 17.033 0 0041.9 24.86c0-4.512-1.746-8.765-4.917-11.975zM24.845 33.498h-.796a.79.79 0 010-1.578c.439 0 .796.357.796.796v.782zm.015 7.132c.662 0 1.2.538 1.2 1.2v4.08h-2.4v-4.08c0-.662.538-1.2 1.2-1.2zm4.56 7.68v1.765H20.3V48.31h9.12zm-9.12 4.165h9.12v1.765H20.3v-1.765zm5.56 6.565h-2a3.566 3.566 0 01-3.365-2.4h8.73a3.566 3.566 0 01-3.365 2.4zm8.555-23.088c-2.905 2.505-4.676 6.087-4.956 9.958h-.999v-4.08a3.592 3.592 0 00-1.216-2.694l.001-.016v-3.944a3.858 3.858 0 001.615-3.139V30.18a4.642 4.642 0 00-4.637-4.637H22.06a1.2 1.2 0 100 2.4h2.163a2.24 2.24 0 012.237 2.237v.441a3.19 3.19 0 10-2.41 5.278h.795v2.333a3.604 3.604 0 00-3.585 3.6v4.08h-.993c-.263-3.82-2.064-7.428-5.03-10.02a14.638 14.638 0 01-5.017-11.075c.012-3.92 1.569-7.604 4.384-10.375 2.817-2.772 6.525-4.271 10.45-4.22 7.966.104 14.446 6.67 14.446 14.64 0 4.262-1.853 8.304-5.085 11.091z"/>
              <path d="M25.102 13.658h-.018a1.197 1.197 0 00-1.208 1.186 1.205 1.205 0 001.192 1.214h.033c.655 0 1.186-.527 1.193-1.185a1.205 1.205 0 00-1.192-1.215zM30.381 15.067a1.2 1.2 0 10-1.168 2.097 8.816 8.816 0 014.527 7.696 1.2 1.2 0 102.4 0 11.22 11.22 0 00-5.759-9.793zM24.86 5.64a1.2 1.2 0 001.2-1.2V1.2a1.2 1.2 0 10-2.4 0v3.24a1.2 1.2 0 001.2 1.2zM48.52 23.66h-3.24a1.2 1.2 0 100 2.4h3.24a1.2 1.2 0 100-2.4zM4.44 23.66H1.2a1.2 1.2 0 100 2.4h3.24a1.2 1.2 0 100-2.4zM40.148 38.451a1.2 1.2 0 00-1.697 1.697l2.29 2.291a1.198 1.198 0 001.698 0 1.2 1.2 0 000-1.697l-2.291-2.29zM9.572 11.27a1.196 1.196 0 001.697 0 1.2 1.2 0 000-1.698l-2.29-2.29A1.201 1.201 0 007.28 8.977l2.291 2.291zM40.742 7.282l-2.29 2.29a1.2 1.2 0 001.696 1.698l2.29-2.292a1.2 1.2 0 10-1.696-1.696zM9.572 38.451l-2.29 2.29a1.2 1.2 0 001.696 1.698l2.291-2.291a1.2 1.2 0 10-1.697-1.697z"/>
            </g>
        </svg>',
        
        'world-icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="59" viewBox="0 0 60 59">
  <g fill="#E9731F" fill-rule="nonzero">
    <path d="M11.45 50.248a26.267 26.267 0 01-1.846-1.665.918.918 0 00-1.292 0 .918.918 0 000 1.297 23.417 23.417 0 001.909 1.732.918.918 0 001.228-1.364zM1.842 23.032a.918.918 0 00-1.217.783 27.49 27.49 0 00-.429 2.54.918.918 0 00.778 1.028h.116a.918.918 0 00.912-.808c.098-.795.232-1.597.404-2.374a.918.918 0 00-.564-1.17zM6.886 45.382a27.096 27.096 0 01-1.328-2.007.918.918 0 00-1.259-.32l-.002.002a.918.918 0 00-.32 1.258l.002.002c.44.735.918 1.457 1.426 2.148a.918.918 0 001.48-1.083zM3.685 39.593a26.3 26.3 0 01-.79-2.277.918.918 0 00-1.162-.618.918.918 0 00-.612 1.138c.244.82.526 1.64.844 2.448a.927.927 0 101.72-.691zM4.233 16.738a.918.918 0 00-1.234.407c-.385.765-.74 1.554-1.052 2.356-.184.47.045 1 .514 1.187a.918.918 0 001.191-.515l.002-.005c.294-.747.612-1.487.986-2.197a.918.918 0 00-.407-1.233zM2.033 33.206v-.002a28.796 28.796 0 01-.196-2.4.919.919 0 10-1.836.068c0 .857.098 1.72.208 2.57a.918.918 0 00.887.79h.14a.918.918 0 00.797-1.026zM26.387 2.582a.922.922 0 00-1.007-.83 27.87 27.87 0 00-2.552.374A.922.922 0 1023 3.962l-.007-.024h.178c.79-.153 1.591-.27 2.387-.35a.922.922 0 00.829-1.006zM8.22 11.184a.924.924 0 00-1.304.08 26.988 26.988 0 00-1.603 2.019.918.918 0 00.74 1.456v.013a.918.918 0 00.747-.38c.471-.649.973-1.285 1.5-1.885a.924.924 0 00-.08-1.303zM32.437 1.906a27.576 27.576 0 00-2.565-.27.92.92 0 10-.11 1.836c.808.062 1.61.147 2.4.27h.14a.92.92 0 10.135-1.836zM13.433 6.81a.918.918 0 00-1.235-.229 29.684 29.684 0 00-2.057 1.555.92.92 0 101.175 1.414 24.752 24.752 0 011.922-1.457.918.918 0 00.195-1.283zM16.512 6.067h-.018.018zM19.75 3.917a.918.918 0 00-1.255-.597c-.802.293-1.603.612-2.374.997a.918.918 0 00.382 1.75.918.918 0 00.383-.091 26.173 26.173 0 012.221-.93.918.918 0 00.642-1.129zM30.848 57.02a.92.92 0 00-.976-.86c-.801.06-1.61.08-2.41.055a.918.918 0 10-.05 1.836h.777c.612 0 1.224 0 1.8-.055a.92.92 0 00.86-.977zM54.876 35.752a.919.919 0 00-1.117.664 24.956 24.956 0 01-.704 2.302.918.918 0 00.557 1.156.918.918 0 001.174-.554v-.003c.288-.808.54-1.634.754-2.448a.919.919 0 00-.664-1.117zM56.048 25.241a29.277 29.277 0 00-.533-2.521.918.918 0 00-1.775.465c.202.771.368 1.567.502 2.356.08.433.454.748.894.753h.153c.5-.081.84-.552.759-1.053z"/>
    <path d="M59.95 14.705a.89.89 0 00-.175-.253l-1.622-1.69a.887.887 0 00-.888-.22l-2.925.888-3.427-3.635 7.693-4.284a.893.893 0 00.263-1.438l-2.16-2.16a.894.894 0 00-.888-.209l-9.749 2.95-3.28-3.482A2.968 2.968 0 0039.413.37h-.055a3.61 3.61 0 00-1.964 1.964 3.308 3.308 0 00-.196.723l-.373-.129a.92.92 0 00-.563 1.75c.47.153.942.325 1.413.502.142.222.308.427.496.612l3.458 3.28-.992 3.275C30.941 5.43 17.472 7.683 10.555 17.38c-6.917 9.697-4.663 23.165 5.034 30.082 9.697 6.917 23.165 4.663 30.082-5.033a21.567 21.567 0 00-.474-25.688l1.567-2.828 3.635 3.428-.875 2.894a.887.887 0 00.214.906s1.793 1.775 1.836 1.836a.888.888 0 001.224-.343l2.393-4.388 4.32-2.356a.893.893 0 00.438-1.185zm-45.696 1.21a19.652 19.652 0 0113.91-5.753c.409 0 .817.012 1.225.036 3.47 3.201 2.448 6.12.122 8.752a42.959 42.959 0 01-4.406 4.064c-2.258 1.921-4.364 3.714-5.16 5.508-.942 2.13-.25 4.057 3.556 5.74 1.904.845 2.938 1.5 3.342 1.995a.099.099 0 00.018.017 7.606 7.606 0 01-2.93.51c-4.616.195-7.902-2.754-10.454-5.037-1.836-1.634-3.36-2.993-4.945-3.005a19.652 19.652 0 015.722-12.828zm33.654 13.94h.006a19.731 19.731 0 01-13.592 18.746 6.42 6.42 0 01.752-4.167 15.173 15.173 0 013.672-4.04c5.65-4.712 5.967-7.344 6.212-9.37.153-1.278.27-2.233 2.797-3.622.101.814.153 1.633.153 2.454zm-1.138-6.621c.273.77.498 1.558.673 2.356-3.85 1.959-4.021 3.354-4.254 5.257-.208 1.714-.477 3.954-5.581 8.213a16.739 16.739 0 00-4.1 4.547 8.116 8.116 0 00-.918 5.466C21.973 51.499 11.4 44.86 8.973 34.244a19.72 19.72 0 01-.484-3.697c.973 0 2.234 1.157 3.782 2.534 2.803 2.503 6.39 5.698 11.732 5.508a9.18 9.18 0 003.672-.698c.49-.216.862-.637 1.016-1.15a1.75 1.75 0 00-.44-1.598c-.576-.703-1.836-1.536-4.003-2.503-2.589-1.144-3.152-2.258-2.644-3.396.612-1.432 2.583-3.06 4.676-4.896a44.55 44.55 0 004.596-4.284c2.558-2.913 3.874-6.09 1.273-9.566 2.89.591 5.61 1.828 7.956 3.617l-1.408 4.645a.893.893 0 00.215.906s2.282 2.264 2.356 2.307a.888.888 0 001.224-.342l1.78-3.22a19.677 19.677 0 012.498 4.823zm8.207-6.836l-.79.392a.881.881 0 00-.404.41l-.392.795-1.523 2.754-.447-.49.887-2.93a.887.887 0 00-.287-.943l-4.83-4.547a.887.887 0 00-1.278.036c-.061.068-4.407 7.895-4.407 7.895l-.948-.949L43.52 9.06a.887.887 0 00-.288-.949L39.39 4.495a1.273 1.273 0 01-.349-1.47c.195-.444.552-.798.998-.99h.03A1.273 1.273 0 0141.5 2.4l3.672 3.88c.23.248.582.343.906.245L55.87 3.57l.949.949-7.773 4.272a.887.887 0 00-.342 1.224c.036.067 4.718 5.049 4.718 5.049a.887.887 0 00.906.238l2.944-.887.459.459-2.754 1.524zM52.612 42.204a.918.918 0 00-1.265.339 24.322 24.322 0 01-1.26 2.056.92.92 0 001.505 1.059c.478-.71.93-1.45 1.347-2.197.256-.438.11-1-.327-1.257zM55.515 28.803a.918.918 0 00-.93.943v.104c0 .801-.037 1.61-.11 2.411a.918.918 0 00.83.997h.088a.918.918 0 00.924-.85c.08-.85.116-1.714.116-2.57v-.123a.918.918 0 00-.918-.912zM23.281 55.756a18.963 18.963 0 01-2.35-.539.918.918 0 10-.502 1.763 37.5 37.5 0 002.51.612h.17a.922.922 0 10.172-1.836zM37.485 55.477a.918.918 0 00-1.113-.566v.025a18.24 18.24 0 01-2.32.612.92.92 0 00.404 1.793c.833-.19 1.671-.422 2.485-.686a.918.918 0 00.544-1.178zM16.984 53.754a44.174 44.174 0 01-2.136-1.144.919.919 0 10-.93 1.585c.74.435 1.505.838 2.282 1.224a.92.92 0 00.784-1.665zM48.712 47.85a.918.918 0 00-1.281.042h.006c-.551.612-1.132 1.15-1.726 1.683a.919.919 0 001.224 1.37c.612-.569 1.26-1.175 1.836-1.799a.918.918 0 00-.059-1.297zM43.647 52.428a.918.918 0 00-1.302-.29v-.024c-.673.429-1.377.833-2.087 1.224a.918.918 0 00.838 1.634 28.892 28.892 0 002.234-1.285.918.918 0 00.317-1.259z"/>
  </g>
</svg>',
        
        'phone-icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 17 19">
    <path fill="currentColor" fill-rule="nonzero" d="M6.219 2.235a9.652 9.652 0 00.323 3.052c.14.49-.017 1.033-.354 1.33L4.647 8.452c1.066 2.276 2.357 3.71 4.493 4.992l1.933-1.302a1.374 1.374 0 011.408-.264 9.667 9.667 0 003.006.643c.752.039 1.33.682 1.291 1.433l-.163 3.118a1.366 1.366 0 01-1.434 1.29C6.571 17.912-.066 10.54.385 1.93c.04-.751.683-1.33 1.434-1.29L4.928.8c.75.04 1.33.683 1.29 1.434zm-4.4-.595a.417.417 0 00-.438.394c-.42 8.03 5.77 14.906 13.8 15.326a.417.417 0 00.438-.394l.162-3.095a.417.417 0 00-.394-.437 10.512 10.512 0 01-3.269-.699c-.153-.056-.316-.026-.488.123l-2.215 1.498a.47.47 0 01-.497.018c-2.512-1.45-4.024-3.129-5.22-5.798a.467.467 0 01.069-.493l1.766-2.094a.414.414 0 00.12-.419A10.526 10.526 0 015.3 2.24a.417.417 0 00-.394-.439L1.819 1.64z"/>
</svg>',

        'left-quote' => '<svg xmlns="http://www.w3.org/2000/svg" width="79" height="62" viewBox="0 0 79 62">
  <g fill="#123759" fill-rule="nonzero">
    <path d="M34.4 27.104V61.6H0V26.611C0 2.957 22.114 0 22.114 0l2.949 6.9s-9.829 1.478-11.794 9.362c-1.966 5.914 1.965 10.842 1.965 10.842H34.4zM78.4 27.104V61.6H44V26.611C44 2.957 66.114 0 66.114 0l2.949 6.9s-9.829 1.478-11.794 9.362c-1.966 5.914 1.965 10.842 1.965 10.842H78.4z"/>
  </g>
</svg>',

        'award-icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="79" height="57" viewBox="0 0 79 57">
  <g fill="#E9731F" fill-rule="nonzero" stroke="#123759">
    <path d="M50.56 29.934a1.238 1.238 0 00-1-.844l-6.252-.909-2.796-5.665a1.24 1.24 0 00-2.224 0l-2.796 5.665-6.252.909a1.24 1.24 0 00-.687 2.115l4.524 4.41-1.068 6.227a1.24 1.24 0 001.799 1.307l5.592-2.94 5.592 2.94a1.239 1.239 0 001.8-1.307l-1.069-6.227 4.524-4.41c.338-.33.46-.823.314-1.271zm-7.035 4.36a1.24 1.24 0 00-.356 1.098l.754 4.393-3.946-2.074a1.24 1.24 0 00-1.154 0l-3.945 2.074.754-4.393a1.24 1.24 0 00-.357-1.098l-3.192-3.111 4.411-.641a1.24 1.24 0 00.934-.678l1.973-3.997 1.973 3.997c.18.366.53.62.933.678l4.411.641-3.193 3.111z"/>
    <path d="M18.568 22.748c5.056 0 9.803-3.15 11.584-8.18a1.24 1.24 0 00-.755-1.583 12.194 12.194 0 00-9.337.472 27.944 27.944 0 012.462-2.817 1.24 1.24 0 10-1.754-1.753c-.639.639-1.241 1.3-1.811 1.98-.136-3.682-1.915-7.267-5.143-9.564a1.24 1.24 0 00-1.73.291 12.196 12.196 0 00-2.103 9.158 12.186 12.186 0 004.407 7.52 30.167 30.167 0 00-1.07 2.879 12.47 12.47 0 00-.853-1.587A12.197 12.197 0 004.78 14.16a1.24 1.24 0 00-1.481.94c-1.428 6.375 2.409 12.723 8.617 14.487-.031 1.314.024 2.63.163 3.939a12.53 12.53 0 00-.902-.731 12.197 12.197 0 00-9.124-2.245 1.24 1.24 0 00-1.039 1.413 12.195 12.195 0 004.865 8.039 12.185 12.185 0 008.496 2.322 30.055 30.055 0 001.755 3.45c-3.836-1.23-8.2-.558-11.543 2.179a1.24 1.24 0 00-.174 1.745 12.196 12.196 0 008.282 4.438c.415.041.828.061 1.239.061 2.533 0 4.976-.778 7.05-2.245a30.518 30.518 0 004.537 3.67 1.24 1.24 0 101.367-2.07 28.04 28.04 0 01-4.366-3.565A27.653 27.653 0 0116.03 39.76c5.888-2.27 9.164-8.73 7.362-14.894a1.24 1.24 0 00-1.539-.843 12.196 12.196 0 00-7.322 5.888c-.05.091-.096.184-.143.277a27.98 27.98 0 011.15-7.824c1.008.259 2.025.384 3.03.384zm-6.707 4.214a9.819 9.819 0 01-6.345-10.006c2 .74 3.694 2.105 4.855 3.936a9.722 9.722 0 011.49 6.07zm-4.513 11.04a9.723 9.723 0 01-3.593-5.113l.157-.001a9.82 9.82 0 019.39 7.018 9.734 9.734 0 01-5.954-1.903zm5.593 13.665a9.723 9.723 0 01-5.698-2.57 9.819 9.819 0 0111.79 1.175 9.727 9.727 0 01-6.092 1.395zm3.765-20.565a9.725 9.725 0 014.592-4.24 9.819 9.819 0 01-5.69 10.392 9.725 9.725 0 011.098-6.152zm4.375-15.386a9.723 9.723 0 016.205-.753 9.818 9.818 0 01-10.694 5.101 9.725 9.725 0 014.49-4.348zm-8.655-5.376a9.721 9.721 0 01.98-6.173 9.819 9.819 0 011.969 11.683 9.722 9.722 0 01-2.949-5.51zM65.676 42.388c2.595 0 5.115-.821 7.245-2.387a12.195 12.195 0 004.865-8.039 1.24 1.24 0 00-1.039-1.413c-3.76-.574-7.387.631-10.026 2.984.138-1.312.194-2.63.163-3.948a12.185 12.185 0 007.005-5.23 12.196 12.196 0 001.612-9.257 1.24 1.24 0 00-1.48-.94c-3.2.717-5.93 2.637-7.686 5.406a12.473 12.473 0 00-.852 1.587 30.144 30.144 0 00-1.07-2.879c5.019-4.037 6.085-11.362 2.303-16.678a1.238 1.238 0 00-1.73-.291 12.197 12.197 0 00-4.988 7.963c-.09.532-.14 1.064-.16 1.595a30.466 30.466 0 00-1.806-1.974 1.24 1.24 0 00-1.754 1.753 27.94 27.94 0 012.462 2.817 12.193 12.193 0 00-9.337-.472 1.24 1.24 0 00-.755 1.583c1.781 5.031 6.528 8.18 11.584 8.18 1.005 0 2.022-.125 3.03-.384a27.986 27.986 0 011.15 7.836 12.24 12.24 0 00-7.465-6.177 1.24 1.24 0 00-1.538.843 12.195 12.195 0 001.014 9.34 12.183 12.183 0 006.347 5.555 27.658 27.658 0 01-6.492 10.225 28.033 28.033 0 01-4.365 3.566 1.24 1.24 0 001.366 2.07 30.509 30.509 0 004.537-3.672 12.22 12.22 0 007.062 2.24c3.556 0 7.085-1.533 9.51-4.493a1.24 1.24 0 00-.175-1.745 12.199 12.199 0 00-8.994-2.718 12.4 12.4 0 00-2.542.528 30.044 30.044 0 001.749-3.44c.417.043.834.066 1.25.066zm7.61-25.431a9.724 9.724 0 01-1.491 6.07 9.723 9.723 0 01-4.855 3.936 9.818 9.818 0 016.345-10.006zm1.758 15.932c-1.24 4.201-5.166 7.083-9.545 7.016 1.24-4.201 5.165-7.088 9.546-7.016zm-23.53-17.926a9.721 9.721 0 016.204.753 9.723 9.723 0 014.49 4.348 9.818 9.818 0 01-10.694-5.1zm11.91.887a9.72 9.72 0 01-.98-6.172 9.723 9.723 0 012.949-5.511 9.82 9.82 0 01-1.969 11.683zm2.04 31.851a9.721 9.721 0 016.093 1.396 9.82 9.82 0 01-11.79 1.174 9.723 9.723 0 015.697-2.57zm-2.273-10.446a9.723 9.723 0 01-4.592-4.24 9.724 9.724 0 01-1.098-6.152c4 1.785 6.34 6.06 5.69 10.392z"/>
  </g>
</svg>',

        'chevron-up' => '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8">
  <path fill="currentColor" d="M12.776 7.67a.843.843 0 000-1.142L7.041.464a.74.74 0 00-1.08 0L.226 6.528a.835.835 0 000 1.142.73.73 0 001.08 0l5.195-5.492 5.195 5.492c.3.31.787.31 1.08 0z"/>
</svg>',
        
        'chevron-right' => '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="19" viewBox="0 0 11 19">
            <path fill="currentColor" d="M.342 18.673c.222.214.526.327.818.327.292 0 .596-.113.818-.327l8.683-8.382a1.09 1.09 0 000-1.58L1.978.332a1.179 1.179 0 00-1.636 0 1.083 1.083 0 000 1.578l7.865 7.592-7.865 7.593a1.103 1.103 0 000 1.579z"/>
        </svg>',
        
        // social icons https://codepen.io/ruandre/pen/howFi

		'facebook' => '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z"></path><span class="screen-reader-text">facebook icon</span></svg>',

		'gplus' => '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M179.7 237.6L179.7 284.2 256.7 284.2C253.6 304.2 233.4 342.9 179.7 342.9 133.4 342.9 95.6 304.4 95.6 257 95.6 209.6 133.4 171.1 179.7 171.1 206.1 171.1 223.7 182.4 233.8 192.1L270.6 156.6C247 134.4 216.4 121 179.7 121 104.7 121 44 181.8 44 257 44 332.2 104.7 393 179.7 393 258 393 310 337.8 310 260.1 310 251.2 309 244.4 307.9 237.6L179.7 237.6 179.7 237.6ZM468 236.7L429.3 236.7 429.3 198 390.7 198 390.7 236.7 352 236.7 352 275.3 390.7 275.3 390.7 314 429.3 314 429.3 275.3 468 275.3"></path><span class="screen-reader-text">google plus icon</span></svg>',

		'linkedin' => '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M186.4 142.4c0 19-15.3 34.5-34.2 34.5 -18.9 0-34.2-15.4-34.2-34.5 0-19 15.3-34.5 34.2-34.5C171.1 107.9 186.4 123.4 186.4 142.4zM181.4 201.3h-57.8V388.1h57.8V201.3zM273.8 201.3h-55.4V388.1h55.4c0 0 0-69.3 0-98 0-26.3 12.1-41.9 35.2-41.9 21.3 0 31.5 15 31.5 41.9 0 26.9 0 98 0 98h57.5c0 0 0-68.2 0-118.3 0-50-28.3-74.2-68-74.2 -39.6 0-56.3 30.9-56.3 30.9v-25.2H273.8z"></path><span class="screen-reader-text">linkedin icon</span></svg>',

		'twitter' => '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36 -12.6 7.5-26.5 12.9-41.3 15.8 -11.9-12.6-28.8-20.6-47.5-20.6 -42 0-72.9 39.2-63.4 79.9 -54.1-2.7-102.1-28.6-134.2-68 -17 29.2-8.8 67.5 20.1 86.9 -10.7-0.3-20.7-3.3-29.5-8.1 -0.7 30.2 20.9 58.4 52.2 64.6 -9.2 2.5-19.2 3.1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2 -27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 120.8 0 189.1-102.1 185-193.6C399.9 193.1 410.9 181.7 419.6 168.6z"></path><span class="screen-reader-text">twitter icon</span></svg>',

		'instagram' => '<svg viewBox="0 0 512 512"><g><path d="M256 109.3c47.8 0 53.4 0.2 72.3 1 17.4 0.8 26.9 3.7 33.2 6.2 8.4 3.2 14.3 7.1 20.6 13.4 6.3 6.3 10.1 12.2 13.4 20.6 2.5 6.3 5.4 15.8 6.2 33.2 0.9 18.9 1 24.5 1 72.3s-0.2 53.4-1 72.3c-0.8 17.4-3.7 26.9-6.2 33.2 -3.2 8.4-7.1 14.3-13.4 20.6 -6.3 6.3-12.2 10.1-20.6 13.4 -6.3 2.5-15.8 5.4-33.2 6.2 -18.9 0.9-24.5 1-72.3 1s-53.4-0.2-72.3-1c-17.4-0.8-26.9-3.7-33.2-6.2 -8.4-3.2-14.3-7.1-20.6-13.4 -6.3-6.3-10.1-12.2-13.4-20.6 -2.5-6.3-5.4-15.8-6.2-33.2 -0.9-18.9-1-24.5-1-72.3s0.2-53.4 1-72.3c0.8-17.4 3.7-26.9 6.2-33.2 3.2-8.4 7.1-14.3 13.4-20.6 6.3-6.3 12.2-10.1 20.6-13.4 6.3-2.5 15.8-5.4 33.2-6.2C202.6 109.5 208.2 109.3 256 109.3M256 77.1c-48.6 0-54.7 0.2-73.8 1.1 -19 0.9-32.1 3.9-43.4 8.3 -11.8 4.6-21.7 10.7-31.7 20.6 -9.9 9.9-16.1 19.9-20.6 31.7 -4.4 11.4-7.4 24.4-8.3 43.4 -0.9 19.1-1.1 25.2-1.1 73.8 0 48.6 0.2 54.7 1.1 73.8 0.9 19 3.9 32.1 8.3 43.4 4.6 11.8 10.7 21.7 20.6 31.7 9.9 9.9 19.9 16.1 31.7 20.6 11.4 4.4 24.4 7.4 43.4 8.3 19.1 0.9 25.2 1.1 73.8 1.1s54.7-0.2 73.8-1.1c19-0.9 32.1-3.9 43.4-8.3 11.8-4.6 21.7-10.7 31.7-20.6 9.9-9.9 16.1-19.9 20.6-31.7 4.4-11.4 7.4-24.4 8.3-43.4 0.9-19.1 1.1-25.2 1.1-73.8s-0.2-54.7-1.1-73.8c-0.9-19-3.9-32.1-8.3-43.4 -4.6-11.8-10.7-21.7-20.6-31.7 -9.9-9.9-19.9-16.1-31.7-20.6 -11.4-4.4-24.4-7.4-43.4-8.3C310.7 77.3 304.6 77.1 256 77.1L256 77.1z"></path><path d="M256 164.1c-50.7 0-91.9 41.1-91.9 91.9s41.1 91.9 91.9 91.9 91.9-41.1 91.9-91.9S306.7 164.1 256 164.1zM256 315.6c-32.9 0-59.6-26.7-59.6-59.6s26.7-59.6 59.6-59.6 59.6 26.7 59.6 59.6S288.9 315.6 256 315.6z"></path><circle cx="351.5" cy="160.5" r="21.5"></circle></g></svg>',

		'pinterest' => '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M266.6 76.5c-100.2 0-150.7 71.8-150.7 131.7 0 36.3 13.7 68.5 43.2 80.6 4.8 2 9.2 0.1 10.6-5.3 1-3.7 3.3-13 4.3-16.9 1.4-5.3 0.9-7.1-3-11.8 -8.5-10-13.9-23-13.9-41.3 0-53.3 39.9-101 103.8-101 56.6 0 87.7 34.6 87.7 80.8 0 60.8-26.9 112.1-66.8 112.1 -22.1 0-38.6-18.2-33.3-40.6 6.3-26.7 18.6-55.5 18.6-74.8 0-17.3-9.3-31.7-28.4-31.7 -22.5 0-40.7 23.3-40.7 54.6 0 19.9 6.7 33.4 6.7 33.4s-23.1 97.8-27.1 114.9c-8.1 34.1-1.2 75.9-0.6 80.1 0.3 2.5 3.6 3.1 5 1.2 2.1-2.7 28.9-35.9 38.1-69 2.6-9.4 14.8-58 14.8-58 7.3 14 28.7 26.3 51.5 26.3 67.8 0 113.8-61.8 113.8-144.5C400.1 134.7 347.1 76.5 266.6 76.5z"/></svg>',

		'vimeo' => '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M420.1 197.9c-1.5 33.6-25 79.5-70.3 137.8 -46.9 60.9-86.5 91.4-118.9 91.4 -20.1 0-37.1-18.5-51-55.6 -9.3-34-18.5-68-27.8-102 -10.3-37.1-21.4-55.7-33.2-55.7 -2.6 0-11.6 5.4-27 16.2L75.7 209.1c17-14.9 33.8-29.9 50.3-44.9 22.7-19.6 39.7-29.9 51.1-31 26.8-2.6 43.3 15.8 49.5 55 6.7 42.4 11.3 68.7 13.9 79 7.7 35.1 16.2 52.7 25.5 52.7 7.2 0 18-11.4 32.5-34.2 14.4-22.8 22.2-40.1 23.2-52.1 2.1-19.7-5.7-29.5-23.2-29.5 -8.3 0-16.8 1.9-25.5 5.7 16.9-55.5 49.3-82.4 97.1-80.9C405.5 130 422.2 153 420.1 197.9z"></path><span class="screen-reader-text">vimeo icon</span></svg>',

		'youtube' => '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M422.6 193.6c-5.3-45.3-23.3-51.6-59-54 -50.8-3.5-164.3-3.5-215.1 0 -35.7 2.4-53.7 8.7-59 54 -4 33.6-4 91.1 0 124.8 5.3 45.3 23.3 51.6 59 54 50.9 3.5 164.3 3.5 215.1 0 35.7-2.4 53.7-8.7 59-54C426.6 284.8 426.6 227.3 422.6 193.6zM222.2 303.4v-94.6l90.7 47.3L222.2 303.4z"/><span class="screen-reader-text">youtube icon</span></svg>',

		'email' => '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M101.3 141.6v228.9h0.3 308.4 0.8V141.6H101.3zM375.7 167.8l-119.7 91.5 -119.6-91.5H375.7zM127.6 194.1l64.1 49.1 -64.1 64.1V194.1zM127.8 344.2l84.9-84.9 43.2 33.1 43-32.9 84.7 84.7L127.8 344.2 127.8 344.2zM384.4 307.8l-64.4-64.4 64.4-49.3V307.8z"></path></svg>',

	);

	if ( isset( $svgs[ $type ] ) ) {
		return $svgs[ $type ];
	}

}


add_shortcode( 'bmp_svg', '_s_get_svg' );

function _s_get_svg( $atts = array() ) {
	$atts = shortcode_atts( array(
		'type' => '',
	), $atts, 'svg' );

	if ( ! isset( $atts['type'] ) ) {
		return;
	}

	$svg = get_svg( $atts['type'] );

	return $svg;
}

// @ts-check

// NAME: oldSidebar
// AUTHOR: CharlieS1103
// DESCRIPTION: Restore the old spotify sidebar

/// <reference path="../../spicetify-cli/globals.d.ts" />

(function oldSidebar() {
    const { Platform } = Spicetify;
    // Also wait till the sidebar is loaded
   if (!(Platform) || !document.querySelector('.Root__nav-bar') || document.getElementsByClassName("main-topBar-navLink").length < 2) {
        setTimeout(oldSidebar, 10)
        console.log("Waiting for sidebar to load")
        return
    }
    let oldHTML = `
   <div class="main-navBar-navBar">
      <ul class="main-navBar-entryPoints">
         <li class="main-navBar-navBarItem InvalidDropTarget">
            <a class="link-subtle main-navBar-navBarLink" draggable="false" href="/">
               <svg role="img" height="24" width="24" aria-hidden="true" class="Svg-sc-ytk21e-0 uPxdw home-icon" viewBox="0 0 24 24">
                  <path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"></path>
               </svg>
               <svg role="img" height="24" width="24" aria-hidden="true" class="Svg-sc-ytk21e-0 uPxdw home-active-icon" viewBox="0 0 24 24">
                  <path d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"></path>
               </svg>
               <span class="Type__TypeElement-sc-goli3j-0 jdSGNV ellipsis-one-line">Home</span>
            </a>
         </li>
         <li class="main-navBar-navBarItem InvalidDropTarget">
            <a class="link-subtle main-navBar-navBarLink" draggable="false" href="/search">
               <svg role="img" height="24" width="24" aria-hidden="true" class="Svg-sc-ytk21e-0 uPxdw search-icon" viewBox="0 0 24 24">
                  <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
               </svg>
               <svg role="img" height="24" width="24" aria-hidden="true" class="Svg-sc-ytk21e-0 uPxdw search-active-icon" viewBox="0 0 24 24">
                  <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"></path>
                  <path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 01-2.077 5.816l4.344 4.344a1 1 0 01-1.414 1.414l-4.353-4.353a9.454 9.454 0 01-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></path>
               </svg>
               <span class="Type__TypeElement-sc-goli3j-0 jdSGNV ellipsis-one-line">Search</span>
            </a>
         </li>
         <li class="main-navBar-navBarItem">
            <div class="GlueDropTarget GlueDropTarget--tracks GlueDropTarget--albums GlueDropTarget--artists GlueDropTarget--playlists GlueDropTarget--playlists GlueDropTarget--shows b2KVTiBUcXV1kT0OjL2p">
               <a class="link-subtle main-navBar-navBarLink" draggable="false" href="/collection">
                  <svg role="img" height="24" width="24" aria-hidden="true" class="Svg-sc-ytk21e-0 uPxdw collection-icon" viewBox="0 0 24 24">
                     <path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"></path>
                  </svg>
                  <svg role="img" height="24" width="24" aria-hidden="true" class="Svg-sc-ytk21e-0 uPxdw collection-active-icon" viewBox="0 0 24 24">
                     <path d="M3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zM15.5 2.134A1 1 0 0014 3v18a1 1 0 001 1h6a1 1 0 001-1V6.464a1 1 0 00-.5-.866l-6-3.464zM9 2a1 1 0 00-1 1v18a1 1 0 102 0V3a1 1 0 00-1-1z"></path>
                  </svg>
                  <span class="Type__TypeElement-sc-goli3j-0 jdSGNV ellipsis-one-line">Your Library</span>
               </a>
            </div>
         </li>
         **INJECTION**
      </ul>
      <div class="main-rootlist-rootlist">
         <div class="main-rootlist-rootlistContent">
            <div class="GlueDropTarget GlueDropTarget--albums GlueDropTarget--tracks GlueDropTarget--local-tracks GlueDropTarget--episodes">
               <button type="button" class="main-createPlaylistButton-button">
                  <div class="main-createPlaylistButton-icon">
                     <div class="main-createPlaylistButton-createPlaylistIcon">
                        <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 uPxdw">
                           <path d="M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z"></path>
                        </svg>
                     </div>
                  </div>
                  <span class="Type__TypeElement-sc-goli3j-0 jdSGNV main-createPlaylistButton-text standalone-ellipsis-one-line">Create Playlist</span>
               </button>
            </div>
            <div class="GlueDropTarget GlueDropTarget--tracks">
               <a class="main-collectionLinkButton-collectionLinkButton" draggable="false" href="/collection/tracks">
                  <div class="main-collectionLinkButton-icon">
                     <div class="main-likedSongsButton-likedSongsIcon">
                        <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 uPxdw">
                           <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
                        </svg>
                     </div>
                  </div>
                  <span class="Type__TypeElement-sc-goli3j-0 jdSGNV standalone-ellipsis-one-line main-collectionLinkButton-collectionLinkText">Liked Songs</span>
                  <div class="main-rootlist-statusIcons"></div>
               </a>
            </div>
            <div class="GlueDropTarget GlueDropTarget--episodes">
               <a class="main-collectionLinkButton-collectionLinkButton" draggable="false" href="/collection/episodes">
                  <div class="main-collectionLinkButton-icon">
                     <div class="main-yourEpisodesButton-yourEpisodesIcon">
                        <div>
                           <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 uPxdw">
                              <path d="M3.75 0A1.75 1.75 0 002 1.75v12.952c0 1.051 1.22 1.633 2.037.972l3.962-3.208 3.943 3.204c.817.663 2.038.082 2.038-.97V1.75A1.75 1.75 0 0012.23 0H3.75z"></path>
                           </svg>
                        </div>
                     </div>
                  </div>
                  <span class="Type__TypeElement-sc-goli3j-0 jdSGNV standalone-ellipsis-one-line main-collectionLinkButton-collectionLinkText">Your Episodes</span>
                  <div class="main-rootlist-statusIcons"></div>
               </a>
            </div>
            <div class="main-rootlist-rootlistDividerContainer">
               <hr class="main-rootlist-rootlistDivider">
               <div class="main-rootlist-rootlistDividerGradient"></div>
            </div>
            <div class="UCEIwrWMxnBFH4uoPybJ">
               <div class="os-host os-host-foreign os-theme-spotify os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-scrollbar-vertical-hidden main-rootlist-rootlistPlaylistsScrollNode os-host-transition">
                  <div class="os-resize-observer-host observed">
                     <div class="os-resize-observer" style="left: 0px; right: auto;"></div>
                  </div>
                  <div class="os-size-auto-observer observed" style="height: calc(100% + 1px); float: left;">
                     <div class="os-resize-observer"></div>
                  </div>
                  <div class="os-content-glue" style="margin: -8px 0px; width: 252px; height: 391px;"></div>
                  <div class="os-padding">
                     <div class="os-viewport os-viewport-native-scrollbars-invisible">
                        <div class="os-content" style="padding: 8px 0px; height: 100%; width: 100%;">
                           <ul role="list" tabindex="0">
                              <div class="main-rootlist-wrapper" style="height: 224px; --row-height:32px;">
                                 <div class="main-rootlist-topSentinel" style="height: 224px;">
                                    <div style="height: calc(100% - 224px);"></div>
                                    <div style="height: 224px;"></div>
                                 </div>
                                 **SECONDINJECTIONPOINT**
                                 <div class="main-rootlist-bottomSentinel" style="height: calc(100% - 224px + 224px);">
                                    <div style="height: 224px;"></div>
                                    <div style="height: calc(100% - 224px);"></div>
                                 </div>
                              </div>
                           </ul>
                           <div class="main-rootlist-dropIndicator"></div>
                        </div>
                     </div>
                  </div>
                  <div class="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
                     <div class="os-scrollbar-track">
                        <div class="os-scrollbar-handle" style="width: 100%; transform: translate(0px, 0px);"></div>
                     </div>
                  </div>
                  <div class="os-scrollbar os-scrollbar-vertical os-scrollbar-unusable os-scrollbar-auto-hidden">
                     <div class="os-scrollbar-track">
                        <div class="os-scrollbar-handle" style="height: 100%; transform: translate(0px, 0px);"></div>
                     </div>
                  </div>
                  <div class="os-scrollbar-corner"></div>
               </div>
            </div>
         </div>
      </div>
      <div class="Foyk_HJx16yh22JYmQ56"></div>
   </div>
   <div class="LayoutResizer__resize-bar LayoutResizer__inline-end" style="z-index: 1;"><label class="hidden-visually">Resize main navigation<input class="LayoutResizer__input" type="range" min="120" max="384" step="10" value="244"></label></div>
`
// Add the customAppHTML to the old HTML at the injection point 
    /*
    <div style="transform: translateY(0px);">
                                    <div class="GlueDropTarget GlueDropTarget--albums GlueDropTarget--tracks GlueDropTarget--local-tracks GlueDropTarget--episodes GlueDropTarget--playlists GlueDropTarget--folders">
                                       <li role="listitem" class="main-rootlist-rootlistItem" draggable="true" style="--indentation:0;">
                                          <div aria-hidden="true" class="main-rootlist-rootlistItemOverlay"></div>
                                          <a class="standalone-ellipsis-one-line main-rootlist-rootlistItemLink" draggable="false" tabindex="-1" href="/playlist/3bQQKzh2ubk6qYHbzJXQCV"><span class="Type__TypeElement-sc-goli3j-0 gkqrGP main-rootlist-textWrapper" dir="auto">acousticy pop</span></a>
                                          <div class="main-rootlist-statusIcons"></div>
                                       </li>
                                    </div>
                                    <div class="GlueDropTarget GlueDropTarget--albums GlueDropTarget--tracks GlueDropTarget--local-tracks GlueDropTarget--episodes GlueDropTarget--playlists GlueDropTarget--folders">
                                       <li role="listitem" class="main-rootlist-rootlistItem" draggable="true" style="--indentation:0;">
                                          <div aria-hidden="true" class="main-rootlist-rootlistItemOverlay"></div>
                                          <a class="standalone-ellipsis-one-line main-rootlist-rootlistItemLink" draggable="false" tabindex="-1" href="/playlist/77rsPGBhxYDyFGIhpROyn4"><span class="Type__TypeElement-sc-goli3j-0 gkqrGP main-rootlist-textWrapper" dir="auto">Better playlist</span></a>
                                          <div class="main-rootlist-statusIcons">
                                             <span aria-label="Collaborative Playlist">
                                                <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 uPxdw">
                                                   <path d="M3.849 10.034c-.021-.465.026-.93.139-1.381H1.669c.143-.303.375-.556.665-.724l.922-.532a1.631 1.631 0 00.436-2.458 1.809 1.809 0 01-.474-1.081c-.01-.19.01-.38.057-.563a1.123 1.123 0 01.627-.7 1.2 1.2 0 01.944 0c.149.065.282.161.392.281.108.12.188.263.237.417.049.183.068.372.057.561a1.81 1.81 0 01-.475 1.084 1.6 1.6 0 00-.124 1.9c.36-.388.792-.702 1.272-.927v-.015c.48-.546.768-1.233.821-1.958a3.23 3.23 0 00-.135-1.132 2.657 2.657 0 00-5.04 0c-.111.367-.157.75-.135 1.133.053.724.341 1.41.821 1.955A.126.126 0 012.565 6a.13.13 0 01-.063.091l-.922.532A3.2 3.2 0 00-.004 9.396v.75h3.866c.001-.033-.01-.071-.013-.112zm10.568-3.4l-.922-.532a.132.132 0 01-.064-.091.12.12 0 01.028-.1c.48-.546.768-1.233.821-1.958a3.289 3.289 0 00-.135-1.135A2.635 2.635 0 0012.7 1.233a2.669 2.669 0 00-3.042.64 2.646 2.646 0 00-.554.948c-.11.367-.156.75-.134 1.133.053.724.341 1.41.821 1.955.005.006 0 .011 0 .018.48.225.911.54 1.272.927a1.6 1.6 0 00-.125-1.907 1.809 1.809 0 01-.474-1.081c-.01-.19.009-.38.057-.563a1.123 1.123 0 01.627-.7 1.2 1.2 0 01.944 0c.149.065.282.161.392.281.107.12.187.26.236.413.05.184.07.375.058.565a1.81 1.81 0 01-.475 1.084 1.633 1.633 0 00.438 2.456l.922.532c.29.169.52.421.664.724h-2.319c.113.452.16.918.139 1.383 0 .04-.013.078-.017.117h3.866v-.75a3.2 3.2 0 00-1.58-2.778v.004zm-3.625 6l-.922-.532a.13.13 0 01-.061-.144.122.122 0 01.025-.047 3.33 3.33 0 00.821-1.958 3.229 3.229 0 00-.135-1.132 2.657 2.657 0 00-5.041 0c-.11.367-.156.75-.134 1.133.053.724.341 1.41.821 1.955a.127.127 0 01.028.106.128.128 0 01-.063.091l-.922.532a3.2 3.2 0 00-1.584 2.773v.75h8.75v-.75a3.2 3.2 0 00-1.583-2.781v.004zm-5.5 2.023c.143-.303.375-.556.665-.724l.922-.532a1.63 1.63 0 00.436-2.458 1.809 1.809 0 01-.474-1.081c-.01-.19.009-.38.057-.563a1.123 1.123 0 01.627-.7 1.2 1.2 0 01.944 0c.149.065.282.161.392.281.108.12.188.263.237.417.049.183.068.372.057.561a1.81 1.81 0 01-.475 1.084 1.632 1.632 0 00.438 2.456l.922.532c.29.169.52.421.664.724l-5.412.003z"></path>
                                                </svg>
                                             </span>
                                          </div>
                                       </li>
                                    </div>
                                    <div class="GlueDropTarget GlueDropTarget--albums GlueDropTarget--tracks GlueDropTarget--local-tracks GlueDropTarget--episodes GlueDropTarget--playlists GlueDropTarget--folders">
                                       <li role="listitem" class="main-rootlist-rootlistItem" draggable="true" style="--indentation:0;">
                                          <div aria-hidden="true" class="main-rootlist-rootlistItemOverlay"></div>
                                          <a class="standalone-ellipsis-one-line main-rootlist-rootlistItemLink" draggable="false" tabindex="-1" href="/playlist/4ZxRZ6qHMM8slzRltzvE0D"><span class="Type__TypeElement-sc-goli3j-0 gkqrGP main-rootlist-textWrapper" dir="auto">classics</span></a>
                                          <div class="main-rootlist-statusIcons"></div>
                                       </li>
                                    </div>
                                    <div class="GlueDropTarget GlueDropTarget--albums GlueDropTarget--tracks GlueDropTarget--local-tracks GlueDropTarget--episodes GlueDropTarget--playlists GlueDropTarget--folders">
                                       <li role="listitem" class="main-rootlist-rootlistItem" draggable="true" style="--indentation:0;">
                                          <div aria-hidden="true" class="main-rootlist-rootlistItemOverlay"></div>
                                          <a class="standalone-ellipsis-one-line main-rootlist-rootlistItemLink" draggable="false" tabindex="-1" href="/playlist/1YEwoiFjQqdtBLW0rWNxTj"><span class="Type__TypeElement-sc-goli3j-0 gkqrGP main-rootlist-textWrapper" dir="auto">shit</span></a>
                                          <div class="main-rootlist-statusIcons"></div>
                                       </li>
                                    </div>
                                    <div class="GlueDropTarget GlueDropTarget--albums GlueDropTarget--tracks GlueDropTarget--local-tracks GlueDropTarget--episodes GlueDropTarget--playlists GlueDropTarget--folders">
                                       <li role="listitem" class="main-rootlist-rootlistItem" draggable="true" style="--indentation:0;">
                                          <div aria-hidden="true" class="main-rootlist-rootlistItemOverlay"></div>
                                          <a class="standalone-ellipsis-one-line main-rootlist-rootlistItemLink" draggable="false" tabindex="-1" href="/playlist/0PQxSV9QJ05r9ho0WKWO2I"><span class="Type__TypeElement-sc-goli3j-0 gkqrGP main-rootlist-textWrapper" dir="auto">French</span></a>
                                          <div class="main-rootlist-statusIcons"></div>
                                       </li>
                                    </div>
                                    <div class="GlueDropTarget GlueDropTarget--albums GlueDropTarget--tracks GlueDropTarget--local-tracks GlueDropTarget--episodes GlueDropTarget--playlists GlueDropTarget--folders">
                                       <li role="listitem" class="main-rootlist-rootlistItem" draggable="true" style="--indentation:0;">
                                          <div aria-hidden="true" class="main-rootlist-rootlistItemOverlay"></div>
                                          <a class="standalone-ellipsis-one-line main-rootlist-rootlistItemLink" draggable="false" tabindex="-1" href="/playlist/6hRSc7L7M1ijrgE9u3tJvZ"><span class="Type__TypeElement-sc-goli3j-0 gkqrGP main-rootlist-textWrapper" dir="auto">chill</span></a>
                                          <div class="main-rootlist-statusIcons"></div>
                                       </li>
                                    </div>
                                    <div class="GlueDropTarget GlueDropTarget--albums GlueDropTarget--tracks GlueDropTarget--local-tracks GlueDropTarget--episodes GlueDropTarget--playlists GlueDropTarget--folders">
                                       <li role="listitem" class="main-rootlist-rootlistItem" draggable="true" style="--indentation:0;">
                                          <div aria-hidden="true" class="main-rootlist-rootlistItemOverlay"></div>
                                          <a class="standalone-ellipsis-one-line main-rootlist-rootlistItemLink" draggable="false" tabindex="-1" href="/playlist/05bjGmRvknQANd5iO2HnQk"><span class="Type__TypeElement-sc-goli3j-0 gkqrGP main-rootlist-textWrapper" dir="auto">Nice Instrumentals</span></a>
                                          <div class="main-rootlist-statusIcons"></div>
                                       </li>
                                    </div>
                                 </div>
                                 */
    const customAppHTML = createCustomAppHtml(document.getElementsByClassName("Root__nav-bar")[0]);
    if(customAppHTML == undefined){
       console.log("Error")
      return;
    } 
   oldHTML = oldHTML.replace(`**INJECTION**`, customAppHTML);

// Replace the contents of of the element with the class "Root__nav-bar" with the old HTML
document.getElementsByClassName("Root__nav-bar")[0].innerHTML = oldHTML;

// For every "main-navBar-navBarItem" element in the oldHTML, add an event Listener for the click event, when it is clicked, run Spicetify.Platform.History.push() and push the href of the element to the history, also override the default behaviour of the click event
    const elements = document.getElementsByClassName("main-navBar-navBarItem")
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function (e) {
        const href = elements[i].getElementsByTagName("a")[0].href
        // Strip "https://xpui.app.spotify.com" from the href
        Spicetify.Platform.History.push(href.replace("https://xpui.app.spotify.com", ""));
        e.preventDefault();
    });
}
})();


function extractCustomAppsFromSidebarHtml(sidebarHtml) {
      const customAppsData = []
      const customAppElements = sidebarHtml.querySelectorAll(".main-topBar-navLink")
      customAppElements.forEach((customAppElement) => {
         const href = customAppElement.getAttribute("href")
         const icon = customAppElement.getElementsByClassName("home-icon")[0].innerHTML
         const activeIcon = customAppElement.getElementsByClassName("home-active-icon")[0].innerHTML
         // Name is the href  with hypens replaced with spaces, the first / removed,  and with the first letter  of each word capitalized
         const name = href.replace(/-/g, " ").replace("/", "").replace(/\b\w/g, l => l.toUpperCase())
         customAppsData.push({ href, icon, activeIcon, name })
         
      })
   return customAppsData
   }
function createCustomAppHtml(newSidebarHtml) {
      if (!newSidebarHtml == null) return;
      const customAppsData = extractCustomAppsFromSidebarHtml(newSidebarHtml)
      let customAppHtmls = []
      customAppsData.forEach((customAppData) => {
         const customAppHtml = `<li class="main-navBar-navBarItem">
            <a aria-current="page" class="link-subtle main-navBar-navBarLink main-navBar-navBarLinkActive" draggable="false" href="${customAppData.href}">
                <div class="icon collection-icon">
                    ${customAppData.icon}
                </div>
                <div class="icon collection-active-icon">
                    ${customAppData.activeIcon}
                </div>
                <span class="ellipsis-one-line main-type-mestoBold">${customAppData.name}</span>
            </a>
        </li>`
         customAppHtmls.push(customAppHtml)
      })
      return customAppHtmls.join("")
}
HECTO UI UPDATE - INSTALL NOTES

This ZIP contains the Hecto project source with UI adjustments:
- Shared Screen layout uses consistent outer spacing and pins the first direct child as the sticky top row while the remaining content scrolls.
- Shared Screen SafeAreaView handles top and bottom safe areas.
- Retouch Size and Opacity use touch sliders.
- Print Width and Copies use touch sliders.
- Overlay adjustment uses a touch slider.
- Retouch and Overlay bottom controls respect the device bottom safe area.

IMPORTANT:
- Keep a backup of your existing C:\hecto folder before replacing files.
- Extract this ZIP. Copy the contents of its `hecto` folder into C:\hecto and allow overwrite.
- Open VS Code at C:\hecto.
- Run `npm install` only if dependencies are missing or package files changed. No new dependency was added for sliders.
- Run `npx expo-doctor`.
- Run `npx expo start --lan -c` while phone and laptop share Wi-Fi.

Validation note: this source update has not been run on a physical Android device in this environment. Check the app on your phone before making a production EAS build. The existing project logic and dependencies were retained; visual behavior can vary by screen content and device size.

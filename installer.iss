; ============================================================================
;  Blending Builder - Inno Setup installer script
;  Teacher Marc - Sarasas Witaed Rangsit School
;
;  WHAT THIS DOES
;  Takes the finished program in  dist\win-unpacked  and wraps it in one
;  classroom installer:  dist\installer\BlendingBuilder-Setup-<version>.exe
;
;  HOW TO BUILD IT
;    1.  npm run dist          (makes dist\win-unpacked)
;    2.  npm run installer     (runs this file)
;  Or just right-click this file and choose "Compile".
;
;  The version number below must match package.json.
; ============================================================================

#define MyAppName        "Blending Builder"
#define MyAppVersion     "3.2.0"
#define MyAppPublisher   "Teacher Marc - Sarasas Witaed Rangsit School"
#define MyAppExeName     "Blending Builder.exe"
#define MySourceDir      "dist\win-unpacked"

[Setup]
; Never change AppId - Windows uses it to recognise upgrades of this program.
AppId={{A5008B3D-654B-44E8-A908-1FC348640ECF}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
VersionInfoVersion={#MyAppVersion}
VersionInfoDescription={#MyAppName} - phonics for KG3

; Install into the user's own folder so a teacher without an admin
; password can still install it on a classroom PC.
PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
AllowNoIcons=yes

OutputDir=dist\installer
OutputBaseFilename=BlendingBuilder-Setup-{#MyAppVersion}
SetupIconFile=icon.ico
UninstallDisplayIcon={app}\{#MyAppExeName}
UninstallDisplayName={#MyAppName} {#MyAppVersion}

; Best compression - the program is large, this keeps the installer small.
Compression=lzma2/ultra64
SolidCompression=yes
LZMAUseSeparateProcess=yes

; Modern wizard, and a 64-bit only install (Electron is x64).
WizardStyle=modern
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible

; Stop the installer running while the program is open.
CloseApplications=yes
RestartApplications=no

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Create a &desktop shortcut"; GroupDescription: "Shortcuts:"

[Files]
; Everything electron-builder produced, including the resources folder
; that holds app.asar.
Source: "{#MySourceDir}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#MyAppName}";                  Filename: "{app}\{#MyAppExeName}"
Name: "{group}\Uninstall {#MyAppName}";        Filename: "{uninstallexe}"
Name: "{autodesktop}\{#MyAppName}";            Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Start {#MyAppName} now"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
; The saved stars and teacher settings live here. Remove them on uninstall
; so a reinstall starts clean.
Type: filesandordirs; Name: "{localappdata}\blending-builder"
Type: filesandordirs; Name: "{userappdata}\blending-builder"

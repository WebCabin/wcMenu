$(window).ready(function() {

  // A custom data object that is passed into all the callback functions.
  var customData = {
    isEnabled: true
  };

  var myMenu = new wcMenu('.wcMenuContainer', '.container', {
    data: customData,
    version: 'v1.0.0'
  });

  if (myMenu) {

    // A simple menu option.
    myMenu.addOption('File', 'Option', {
      hotkeys: 'Alt+O,Shift+O',
      icon: "fa fa-file-o fa-lg",
      description: "Open a new file.",
      toolbarIndex: -1,
      onActivated: function(data) {
        alert('File -> Option activated!');
      }
    });

    // Put a spacer right after the last 'File' menu item button in the toolbar.
    myMenu.addToolbarSpacer('File', 'Option');

    // A more dynamic set of menu options.
    myMenu.addOption('Toggle', 'Option Enabled', {
      hotkeys: 'E',
      description: 'Toggle enabled status of the next option.',
      toolbarIndex: -1,
      display: function(data) {
        if (data.isEnabled) {
          return "Option On";
        } else {
          return "Option Off";
        }
      },
      icon: function(data) {
        if (data.isEnabled) {
          return "fa fa-toggle-on fa-lg";
        } else {
          return "fa fa-toggle-off fa-lg";
        }
      },
      onActivated: function(data) {
        data.isEnabled = !data.isEnabled;
      }
    });

    myMenu.addSpacer('Toggle', 'Option Enabled');

    myMenu.addOption('Toggle', 'Button', {
      hotkeys: 'B',
      icon: "fa fa-crosshairs fa-lg",
      toolbarIndex: -1,
      description: function(data) {
        if (data.isEnabled) {
          return "This option is enabled!";
        } else {
          return "This option is disabled!";
        }
      },
      condition: function(data) {
        return data.isEnabled;
      },
      onActivated: function(data) {
        alert("Toggle -> Button activated!");
      }
    });


    // myMenu.removeOption('Toggle', 'Option Enabled');

    // for (var i = 0; i < 100; ++i) {
    //   myMenu.addOption('Toggle' + i, 'Test' + i, {
    //     toolbarIndex: -1
    //   });
    // }
  }
});
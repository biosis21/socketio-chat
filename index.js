((ns) => {

    const { TemplateService, SocketAdapter } = ns;

    const DEFAULT_USER = 'Guest';

    const state = {
        message: '',
        owner: 'me',
        user: DEFAULT_USER,
    };

    SocketAdapter.receiveMessage((message) => {
        if (state.user === message.user) {
            TemplateService.enableBottomNavigation();
            TemplateService.cleanMessage();
            TemplateService.appendMessage(state);
        } else {
            TemplateService.appendMessage(message);
        }
    });

    TemplateService.init({ user: state.user });

    TemplateService.on('submit',  () => {
        if (!state.message) {
            return;
        }

        TemplateService.disabledBottomNavigation();
        SocketAdapter.sendMessage(state);
    });

    TemplateService.on('change-message', (value) => {
        state.message = value;
    })

    TemplateService.on('change-username',  (value) => {
        if (value) {
            state.user = value;
        } else {
            state.user = DEFAULT_USER;
            TemplateService.setUser(DEFAULT_USER);
        }
    });

})(window.Chat || {});
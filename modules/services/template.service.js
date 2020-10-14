window.Chat = ((ns) => {

    const { MessageElementBuilderService, PubSub } = ns;

    const _els = {};

    const handleSendBtnClick = () => {
        PubSub.emit('submit');
    };

    const handleKeyDownInputUser = ({ target }) => {
        PubSub.emit('change-username', target.value);
    };

    const handleKeyDownInputMessage = ({ key, target }) => {
        PubSub.emit('change-message', target.value);

        if (key === 'Enter') {
            PubSub.emit('submit');
        }
    };

    const handleBlurUser = ({ target }) => {
        if (target.value === '') {
            PubSub.emit('change-username');
        }
    };

    const appendMessage = (data) => {
        const messageElement = MessageElementBuilderService.factoryBuildMessageByOwner(data.owner, data);
        _els.$messages.appendChild(messageElement);
    };

    const cleanMessage = () => {
        _els.$inputMessage.value = '';
    }

    const setUser = (userName) => {
        _els.$inputUser.value = userName;
    };

    const disabledBottomNavigation = () => {
        _els.$inputMessage.setAttribute('disabled', true);
        _els.$inputUser.setAttribute('disabled', true);
        _els.$sendBtn.setAttribute('disabled', true);
    };

    const enableBottomNavigation = () => {
        _els.$inputMessage.removeAttribute('disabled');
        _els.$inputUser.removeAttribute('disabled');
        _els.$sendBtn.removeAttribute('disabled');
    }

    const getElementById = (...args) => {
        const el = document.getElementById(...args);
        if (!el) throw Error(agrs[0] + ' is not detected');
        return el;
    }

    const init = ({ user }) => {
        _els.$inputUser = getElementById('inputUser')
        _els.$inputMessage = getElementById('inputMessage');
        _els.$sendBtn = getElementById('sendBtn');
        _els.$messages = document.querySelector('.messages');

        setUser(user);

        _els.$inputMessage.addEventListener('keyup', handleKeyDownInputMessage, false);
        _els.$inputUser.addEventListener('keyup', handleKeyDownInputUser, false);
        _els.$inputUser.addEventListener('blur', handleBlurUser, false);
        _els.$sendBtn.addEventListener('click', handleSendBtnClick, false);
    }

    ns.TemplateService = {
        init,
        appendMessage,
        cleanMessage,
        setUser,
        disabledBottomNavigation,
        enableBottomNavigation,
        on: PubSub.on,
    }

    return ns;

})(window.Chat || {});
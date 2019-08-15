import toastComponent from './toast';

const Toast = {};

Toast.install = function(Vue) {
    const ToastConstructor = Vue.extend(toastComponent);
    const instance = new ToastConstructor();

    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);

    Vue.prototype.$toast = (msg, type, duration = 1500) => {
        instance.toastTemplate = msg;
        instance.toastType = type;

        setTimeout(() => {
            instance.toastType = '';
        }, duration);
    };
};

export default Toast;

import { AxiosError } from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const errorHandler = (e: AxiosError) => {
    const error = e as AxiosError<{ message?: Array<string>, msg?: string }>;
    // если нет респа то свой текст
    // или же если есть msg(string) то msg с сервера
    // иначе массив ошибок(message[]) с сервера
    const messages = !error?.response ? ['Something' +
        ' went wrong!\nCheck Your Internet connection or try again']
        : (error.response.data.msg ? [error.response.data.msg]
            : error.response.data.message);
    if (messages?.length) {
        messages.forEach(err => toast.error(`Ooops! ¯\\_(ツ)_/¯\n${err}!`));
    } else {
        // если вдруг есть респ но там нет  msg или message[]
        toast.error(`Ooops! ¯\\_(ツ)_/¯\nSomething' +
        ' went wrong!`);
    }
};

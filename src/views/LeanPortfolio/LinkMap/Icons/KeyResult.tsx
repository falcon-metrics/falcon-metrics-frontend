import { SvgIcon } from "@material-ui/core";
import { IconProps } from "../types/types";
const KeyResultIcon = (props: IconProps) => {
    return (
        <SvgIcon style={{ cursor: props.cursor || 'auto', color: props.color || 'rgb(100%,34.509804%,89.411765%)', fontSize: props.fontSize || 24 }}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g id="surface1">
                    <path stroke='none' fillRule='evenodd' fillOpacity={1} d="M 3.371094 16.957031 L 0.734375 20.589844 C 0.671875 20.675781 0.675781 20.777344 0.75 20.859375 C 0.824219 20.941406 0.945312 20.980469 1.066406 20.960938 L 4.894531 20.34375 C 5.050781 20.320312 5.203125 20.390625 5.253906 20.511719 L 6.496094 23.453125 C 6.539062 23.546875 6.636719 23.613281 6.765625 23.621094 C 6.890625 23.632812 7.003906 23.585938 7.066406 23.5 L 9.949219 19.527344 C 7.429688 19.199219 5.160156 18.28125 3.371094 16.957031 Z M 20.628906 16.957031 L 23.394531 20.769531 C 23.457031 20.855469 23.453125 20.957031 23.378906 21.039062 C 23.304688 21.121094 23.183594 21.15625 23.0625 21.136719 L 19.234375 20.523438 C 19.078125 20.5 18.925781 20.570312 18.875 20.6875 L 17.632812 23.632812 C 17.589844 23.726562 17.492188 23.789062 17.367188 23.800781 C 17.238281 23.8125 17.125 23.765625 17.0625 23.675781 L 14.050781 19.527344 C 16.570312 19.199219 18.839844 18.28125 20.628906 16.957031 Z M 12 0.199219 C 18.511719 0.199219 23.792969 4.398438 23.792969 9.578125 C 23.792969 14.757812 18.511719 18.960938 12 18.960938 C 5.488281 18.960938 0.207031 14.757812 0.207031 9.578125 C 0.207031 4.398438 5.488281 0.199219 12 0.199219 Z M 12 2.351562 C 9.492188 2.351562 7.21875 3.160156 5.574219 4.46875 C 3.929688 5.777344 2.914062 7.582031 2.914062 9.578125 C 2.914062 11.574219 3.929688 13.382812 5.574219 14.6875 C 7.21875 15.996094 9.492188 16.804688 12 16.804688 C 14.507812 16.804688 16.78125 15.996094 18.425781 14.6875 C 20.070312 13.382812 21.085938 11.574219 21.085938 9.578125 C 21.085938 7.582031 20.070312 5.777344 18.425781 4.46875 C 16.78125 3.160156 14.507812 2.351562 12 2.351562 Z M 17.804688 4.960938 C 16.320312 3.78125 14.265625 3.050781 12 3.050781 C 9.734375 3.050781 7.679688 3.78125 6.195312 4.960938 C 4.710938 6.144531 3.792969 7.777344 3.792969 9.578125 C 3.792969 11.382812 4.710938 13.015625 6.195312 14.195312 C 7.679688 15.378906 9.734375 16.109375 12 16.109375 C 14.265625 16.109375 16.320312 15.378906 17.804688 14.195312 C 19.289062 13.015625 20.207031 11.382812 20.207031 9.578125 C 20.207031 7.777344 19.289062 6.144531 17.804688 4.960938 Z M 12.292969 6.015625 C 12.242188 5.917969 12.132812 5.855469 12 5.855469 C 11.867188 5.855469 11.757812 5.917969 11.707031 6.015625 L 10.597656 8.253906 C 10.554688 8.347656 10.449219 8.40625 10.324219 8.414062 L 7.304688 8.558594 C 7.171875 8.566406 7.066406 8.632812 7.027344 8.730469 C 6.984375 8.832031 7.023438 8.933594 7.125 9 L 9.460938 10.53125 C 9.558594 10.597656 9.597656 10.691406 9.566406 10.789062 L 8.804688 13.117188 C 8.773438 13.21875 8.820312 13.320312 8.925781 13.382812 C 9.03125 13.445312 9.167969 13.449219 9.277344 13.390625 L 11.832031 12.097656 C 11.9375 12.042969 12.0625 12.042969 12.167969 12.097656 L 14.722656 13.390625 C 14.832031 13.449219 14.96875 13.445312 15.074219 13.382812 C 15.179688 13.320312 15.226562 13.21875 15.195312 13.117188 L 14.4375 10.789062 C 14.40625 10.691406 14.445312 10.59375 14.539062 10.53125 L 16.875 9 C 16.976562 8.933594 17.015625 8.832031 16.976562 8.730469 C 16.933594 8.632812 16.828125 8.566406 16.695312 8.558594 L 13.675781 8.414062 C 13.550781 8.40625 13.449219 8.347656 13.402344 8.253906 Z M 12.292969 6.015625 " />
                </g>
            </svg>
        </SvgIcon>
    );
};

export default KeyResultIcon;
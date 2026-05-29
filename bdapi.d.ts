export {};

import * as react_dom_client from 'react-dom/client';
import * as react_dom from 'react-dom';
import * as react from 'react';
import react__default, { RefObject, PropsWithChildren, ReactNode, MouseEventHandler, KeyboardEventHandler, ReactElement, ChangeEvent, KeyboardEvent, ElementType, HTMLAttributes, CSSProperties } from 'react';
import { Fiber } from 'react-reconciler';

declare global {
namespace BetterDiscord {
interface Addon {
    added: number;
    author: string;
    authorId?: string;
    authorLink?: string;
    description: string;
    donate?: string;
    fileContent?: string;
    filename: string;
    format: string;
    id: string;
    invite?: string;
    modified: number;
    name: string;
    partial?: boolean;
    patreon?: string;
    size: number;
    slug: string;
    source?: string;
    version: string;
    website?: string;
    runAt?: string;
    icon?: string;
}
type AddonType = "plugin" | "theme";

interface ErrorInfo {
    message?: string;
    stack?: string;
}

abstract class Store {
    #private;
    initialize(): void;
    addChangeListener(callback: () => void): () => void;
    removeChangeListener(callback: () => void): void;
    emitChange(): void;
}

abstract class AddonManager<T extends Addon = Addon> extends Store {
    abstract name: string;
    abstract extension: string;
    abstract duplicatePattern: RegExp;
    abstract addonFolder: string;
    abstract language: string;
    abstract prefix: AddonType;
    abstract order: number;
    addonList: T[];
    addonInfo: Addon[];
    trigger(event: string, ...args: any[]): boolean;
    timeCache: Record<string, number>;
    state: Record<string, boolean>;
    windows: Set<string>;
    hasInitialized: boolean;
    initialAddonsLoaded: number;
    initialize(): void;
    finishInit(): void;
    abstract startAddon(idOrAddon: string | T): boolean;
    abstract stopAddon(idOrAddon: string | T): boolean;
    loadState(): void;
    saveState(): void;
    showAddonError(addon: Addon, message: string, info: ErrorInfo): null;
    watchAddons(): void;
    readAllAddons(): void;
    readAddon(filename: string, loadAfter?: boolean): Addon | null;
    abstract initAddon(addon: Addon): T | null;
    loadAddon(addon: Addon): void;
    unloadAddon(idOrFileOrAddon: string | T, isReload?: boolean): boolean;
    reloadAddon(idOrFileOrAddon: string | T): boolean;
    isLoaded(idOrFile: string): boolean;
    isEnabled(idOrFile: string): boolean;
    enableAddon(idOrAddon: string | T): boolean | undefined;
    enableAllAddons(): void;
    disableAddon(idOrAddon: string | T): boolean | undefined;
    disableAllAddons(): void;
    toggleAddon(id: string): void;
    deleteAddon(idOrFileOrAddon: string | T): void;
    saveAddon(idOrFileOrAddon: string | T, content: string): void;
    editAddon(idOrFileOrAddon: string | T, system?: "system" | "detached" | "external" | boolean): void;
    openDetached(addon: T): void;
    resolveAddon(idOrFileOrAddon: string | T): T | undefined;
}

/**
 * `AddonAPI` is a utility class for working with plugins and themes. Instances are available on {@link BdApi}.
 */
class AddonAPI {
    #private;
    /** @ignore */
    constructor(manager: AddonManager);
    /**
     * The path to the addon folder.
     */
    get folder(): string;
    /**
     * Determines if a particular addon is enabled.
     * @param idOrFile Addon ID or filename
     */
    isEnabled(idOrFile: string): boolean;
    /**
     * Enables the given addon.
     * @param idOrFile Addon ID or filename
     */
    enable(idOrFile: string): boolean | undefined;
    /**
     * Disables the given addon.
     * @param idOrFile Addon ID or filename
     */
    disable(idOrFile: string): boolean | undefined;
    /**
     * Toggles if a particular addon is enabled.
     * @param idOrFile Addon ID or filename
     */
    toggle(idOrFile: string): void;
    /**
     * Reloads a particular addon if it is enabled.
     * @param idOrFile Addon ID or filename
     */
    reload(idOrFile: string): boolean;
    /**
     * Gets a particular addon.
     * @param idOrFile Addon ID or filename
     * @returns Addon instance
     */
    get(idOrFile: string): Addon | undefined;
    /**
     * Gets all addons of this type.
     * @returns Array of all addon instances
     */
    getAll(): (Addon | undefined)[];
}

type UnknownPatch<P> = (props: P, res: react__default.ReactNode, instance?: react__default.Component<P>) => react__default.ReactNode;
class NodePatcher {
    #private;
    patch<P, T extends react__default.ComponentType<P> = react__default.ComponentType<P>>(node: react__default.ReactElement<P, T>, callback: UnknownPatch<P>): void;
    destroy(): void;
}

function getInternalInstance(node: Element): Fiber | null;
interface GetOwnerInstanceOptions {
    /** A list of items to include in the search */
    include?: string[];
    /** A list of items to exclude from the search */
    exclude?: string[];
    /** A filter to check the current instance with (should return a boolean) */
    filter?: (owner: any) => boolean;
}
function getOwnerInstance(node: Element | undefined, { include, exclude, filter }?: GetOwnerInstanceOptions): any;
function wrapElement(element: Element | Element[]): {
    new (props: any): {
        element: Element | Element[];
        state: {
            hasError: boolean;
        };
        ref: RefObject<HTMLDivElement | null>;
        componentDidCatch(): void;
        componentDidMount(): void;
        render(): react__default.DetailedReactHTMLElement<{
            className: string;
            ref: react__default.RefObject<HTMLDivElement | null>;
        }, HTMLDivElement> | null;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<{}>;
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: react__default.Context<any> | undefined;
    propTypes?: any;
};
type ReactElementType<T extends react__default.FC<P>, P> = T | react__default.MemoExoticComponent<T | react__default.ForwardRefExoticComponent<T>> | react__default.ForwardRefExoticComponent<T> | react__default.LazyExoticComponent<T | react__default.MemoExoticComponent<T | react__default.ForwardRefExoticComponent<T>> | react__default.ForwardRefExoticComponent<T>>;
function getType<T extends react__default.FC<P>, P>(elementType: ReactElementType<T, P>): T;
interface PatchedReactHooks {
    use<T>(usable: PromiseLike<T> | react__default.Context<T>): T;
    useMemo<T>(factory: () => T): T;
    useState<T>(initial: T | (() => T)): [T, () => void];
    useReducer<T>(reducer: (state: T, action: any) => T, initial: T): [T, () => void];
    useRef<T>(value?: T): {
        current: T | null;
    };
    useCallback<T extends (...args: any[]) => any>(callback: T): T;
    useContext<T>(context: react__default.Context<T>): T;
    readContext<T>(context: react__default.Context<T>): T;
    useEffect(): void;
    useLayoutEffect(): void;
    useImperativeHandle(): void;
    useTransition(): [boolean, (callback: () => void) => void];
    useActionState: typeof react__default["useActionState"];
    useFormState: typeof react__default["useActionState"];
    useInsertionEffect(): void;
    useDebugValue(): void;
    useDeferredValue<T>(value: T): T;
    useSyncExternalStore<T>(subscribe: () => void, getSnapshot: () => T): T;
    useId(): string;
    useOptimistic: typeof react__default["useOptimistic"];
}
function wrapInHooks<T extends react__default.FC<P>, P>(functionComponent: T | react__default.MemoExoticComponent<T | react__default.ForwardRefExoticComponent<T>> | react__default.ForwardRefExoticComponent<T>, customPatches?: Partial<PatchedReactHooks>): react__default.FunctionComponent<react__default.ComponentProps<T>>;

/**
 * `ReactUtils` is a utility class for interacting with React internals. An instance is available on {@link BdApi}.
 * This is extremely useful for interacting with the internals of the UI.
 */
class ReactUtils {
    /** @ignore */
    constructor();
    /**
     * @deprecated
     */
    get rootInstance(): any;
    /**
     * Gets the internal React data of a specified node.
     *
     * @param node Node to get the internal React data from
     * @returns Either the found data or `undefined`
     */
    getInternalInstance: typeof getInternalInstance;
    /**
     * Attempts to find the "owner" node to the current node. This is generally
     * a node with a `stateNode` - a class component.
     *
     * @param node Node to obtain React instance of
     * @param options Options for the search
     * @returns The owner instance or `undefined` if not found
     */
    getOwnerInstance: typeof getOwnerInstance;
    /**
     * Creates an unrendered React component that wraps HTML elements.
     *
     * @param element Element or array of elements to wrap
     * @returns Unrendered React component
     */
    wrapElement: typeof wrapElement;
    /**
     * Wraps a functional React component to allow it to be created outside of
     * the normal React lifecycle.
     *
     * @param functionComponent The functional component to wrap
     * @param customPatches Custom react hooks to use
     * @returns The wrapped component
     */
    wrapInHooks: typeof wrapInHooks;
    /**
     * Gets the type of a React component, going through things such as forwardRef and memo
     */
    getType: typeof getType;
    /**
     * Creates a NodePatcher instance which is used to patch React nodes
     */
    createNodePatcher(): NodePatcher;
}


type ErrorBoundaryProps = PropsWithChildren<{
    /** An optional id for debugging purposes */
    id?: string;
    /** An optional name for debugging purposes */
    name?: string;
    /** Whether to hide the default error message in the ui (never shown if there is a fallback) */
    hideError?: boolean;
    /** A fallback to show on error */
    fallback?: ReactNode;
    /** A callback called with the error when it happens */
    onError?(e: Error): void;
}>;
class ErrorBoundary extends react.Component<ErrorBoundaryProps, {
    hasError: boolean;
}> {
    /**
     * Creates an error boundary with optional fallbacks and debug info.
     * @param props
     */
    constructor(props: ErrorBoundaryProps);
    componentDidCatch(error: Error): void;
    render(): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | react.ReactPortal | react.ReactElement<unknown, string | react.JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | react.JSX.Element | null | undefined;
}

type ToastType = "default" | "info" | "success" | "warning" | "error";

interface ToastOptions {
    /** Changes the type of the toast stylistically and semantically */
    type?: ToastType;
    /** Determines whether the icon should show corresponding to the type. A toast without type will always have no icon. */
    icon?: boolean;
    /** Adjusts the time (in ms) the toast should be shown for before disappearing automatically. Defaults to 3000. */
    timeout?: number;
    /** Whether to force showing the toast and ignore the BD setting */
    forceShow?: boolean;
}

type NoticeType = "info" | "error" | "warning" | "success";
interface NoticeButton {
    label: string;
    onClick(close: (immediate?: boolean) => void): void;
}
interface NoticeOptions {
    /** The type of the notice. Will affect the color. */
    type?: NoticeType;
    /** Buttons that should be added next to the notice text */
    buttons?: NoticeButton[];
    /** How long, in milliseconds, the notice will stay open. Will not automatically close when set to `0`. */
    timeout?: number;
    /** A callback to fire when the notice is closed */
    onClose?(): void;
}

const styles: readonly ["primary", "info", "success", "warn", "danger"];
const sides: readonly ["top", "right", "bottom", "left"];
type TooltipStyle = typeof styles[number];
type TooltipSide = typeof sides[number];
interface TooltipOptions {
    /** Correlates to the Discord styling/colors */
    style?: TooltipStyle;
    /** Can be any of top, right, bottom, left */
    side?: TooltipSide;
    /** Prevents moving the tooltip to the opposite side if it is too big or goes offscreen */
    preventFlip?: boolean;
    /** Whether the tooltip should be disabled from showing on hover */
    disabled?: boolean;
}
class Tooltip {
    node: HTMLElement;
    label: string | HTMLElement;
    style: TooltipStyle;
    side: TooltipSide;
    preventFlip: boolean;
    disabled: boolean;
    active: boolean;
    element: HTMLDivElement;
    tooltipElement: HTMLDivElement;
    labelElement: HTMLDivElement;
    observer?: MutationObserver;
    /**
     * @param node DOM node to monitor and show the tooltip on
     * @param text A string to show in the tooltip
     * @param options Additional options for the tooltip
     */
    constructor(node: HTMLElement, text: string | HTMLElement, options?: TooltipOptions);
    /** Alias for the constructor */
    static create(node: HTMLElement, text: string | HTMLElement, options?: TooltipOptions): Tooltip;
    /** Container where the tooltip will be appended. */
    get container(): Element;
    /** Boolean representing if the tooltip will fit on screen above the element */
    get canShowAbove(): boolean;
    /** Boolean representing if the tooltip will fit on screen below the element */
    get canShowBelow(): boolean;
    /** Boolean representing if the tooltip will fit on screen to the left of the element */
    get canShowLeft(): boolean;
    /** Boolean representing if the tooltip will fit on screen to the right of the element */
    get canShowRight(): boolean;
    /** Hides the tooltip. Automatically called on mouseleave. */
    hide(): void;
    /** Shows the tooltip. Automatically called on mouseenter. Will attempt to flip if position was wrong. */
    show(): void;
    /** Force showing the tooltip above the node. */
    showAbove(): void;
    /** Force showing the tooltip below the node. */
    showBelow(): void;
    /** Force showing the tooltip to the left of the node. */
    showLeft(): void;
    /** Force showing the tooltip to the right of the node. */
    showRight(): void;
    centerHorizontally(): void;
    centerVertically(): void;
}

const ButtonLooks: Readonly<{
    FILLED: "bd-button-filled";
    OUTLINED: "bd-button-outlined";
    LINK: "bd-button-link";
    BLANK: "bd-button-blank";
}>;
const ButtonColors: Readonly<{
    BRAND: "bd-button-color-brand";
    BLURPLE: "bd-button-color-blurple";
    RED: "bd-button-color-red";
    GREEN: "bd-button-color-green";
    YELLOW: "bd-button-color-yellow";
    PRIMARY: "bd-button-color-primary";
    LINK: "bd-button-color-link";
    WHITE: "bd-button-color-white";
    TRANSPARENT: "bd-button-color-transparent";
    CUSTOM: "";
}>;
const ButtonSizes: Readonly<{
    NONE: "";
    TINY: "bd-button-tiny";
    SMALL: "bd-button-small";
    MEDIUM: "bd-button-medium";
    LARGE: "bd-button-large";
    ICON: "bd-button-icon";
}>;
type ButtonProps = PropsWithChildren<{
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
    buttonRef?: RefObject<HTMLButtonElement | null>;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    look?: typeof ButtonLooks[keyof typeof ButtonLooks];
    color?: typeof ButtonColors[keyof typeof ButtonColors];
    size?: typeof ButtonSizes[keyof typeof ButtonSizes];
    grow?: boolean;
}>;
function Button(props: ButtonProps): react.JSX.Element;
namespace Button {
    var Looks: Readonly<{
        FILLED: "bd-button-filled";
        OUTLINED: "bd-button-outlined";
        LINK: "bd-button-link";
        BLANK: "bd-button-blank";
    }>;
    var Colors: Readonly<{
        BRAND: "bd-button-color-brand";
        BLURPLE: "bd-button-color-blurple";
        RED: "bd-button-color-red";
        GREEN: "bd-button-color-green";
        YELLOW: "bd-button-color-yellow";
        PRIMARY: "bd-button-color-primary";
        LINK: "bd-button-color-link";
        WHITE: "bd-button-color-white";
        TRANSPARENT: "bd-button-color-transparent";
        CUSTOM: "";
    }>;
    var Sizes: Readonly<{
        NONE: "";
        TINY: "bd-button-tiny";
        SMALL: "bd-button-small";
        MEDIUM: "bd-button-medium";
        LARGE: "bd-button-large";
        ICON: "bd-button-icon";
    }>;
}

type SettingType = "button" | "custom" | "switch" | "dropdown" | "switch" | "slider" | "color" | "text" | "position" | "radio" | "file" | "keybind" | "number";
interface BaseSettingItem {
    type: SettingType;
    /** An identifier used for callbacks */
    id: string;
    /** The visual name to display */
    name?: string;
    /** The visual description to display */
    note?: string;
    /** Whether this setting is disabled */
    disabled?: boolean;
    /** The id of another setting that is required to use this one */
    enableWith?: string;
    /** The id of another setting that disables this setting */
    disableWith?: string;
    /** A value to use if no value is provided */
    defaultValue?: unknown;
    /** Whether the input should render inline with the name (this is false by default for radio type) */
    inline?: boolean;
    /** Whether the setting should be hidden */
    hidden?: boolean;
}
interface ValueSettingItem<T> extends BaseSettingItem {
    /** The current value of the setting */
    value: T;
    /** A callback run when the setting changes */
    onChange?(value: T): void;
}
interface SwitchSetting extends ValueSettingItem<boolean> {
    type: "switch";
}
interface DropdownSetting<T> extends ValueSettingItem<T> {
    type: "dropdown";
    options: Array<{
        id?: string;
        label: string;
        value: T;
    }>;
    style?: "transparent" | "default";
}
interface SliderSetting extends ValueSettingItem<number> {
    type: "slider";
    min: number;
    max: number;
    step?: number;
    units?: string;
    markers: Array<(number | {
        label: string;
        value: number;
    })>;
}
interface TextSetting extends ValueSettingItem<string> {
    type: "text";
    placeholder?: string;
    maxLength?: number;
}
interface RadioSetting<T> extends ValueSettingItem<T> {
    type: "radio";
    options: Array<{
        name: string;
        value: T;
        description: string;
    }>;
}
interface KeybindSetting extends ValueSettingItem<string[]> {
    type: "keybind";
    clearable?: boolean;
    max?: number;
}
type HexString = `#${string}`;
type Color = HexString | number;
interface ColorSetting extends ValueSettingItem<Color> {
    type: "color";
    defaultValue?: Color;
    colors?: Color[];
}
type Position = "top-right" | "bottom-right" | "bottom-left" | "top-left";
interface PositionSetting extends ValueSettingItem<Position> {
    type: "position";
}
interface NumberSetting extends ValueSettingItem<number> {
    type: "number";
    min: number;
    max: number;
    step?: number;
}
interface SingleFileSetting extends ValueSettingItem<string> {
    type: "file";
    multiple?: false;
    clearable?: boolean;
    accept?: string;
    actions?: {
        clear?(): void;
    };
}
interface MultipleFileSetting extends ValueSettingItem<string[]> {
    type: "file";
    multiple: true;
    clearable?: boolean;
    accept?: string;
    actions?: {
        clear?(): void;
    };
}
type FileSetting = SingleFileSetting | MultipleFileSetting;
type Setting<T = any> = FileSetting | NumberSetting | PositionSetting | ColorSetting | KeybindSetting | RadioSetting<T> | TextSetting | SliderSetting | DropdownSetting<T> | SwitchSetting;
interface SettingsCategory {
    type: "category";
    id: string;
    name?: string;
    collapsible: boolean;
    shown: boolean;
    settings: Setting[];
}

type GroupOnChange = ((id: string, cid: string, value: any) => void) & ((id: string, value: any) => void);
type GroupProps = PropsWithChildren<{
    id: string;
    name?: string;
    button?: object;
    shown?: boolean;
    showDivider?: boolean;
    collapsible?: boolean;
    onDrawerToggle?(state?: boolean): void;
    onChange?: GroupOnChange;
    settings: any;
    collection?: any;
}>;
function Group(props: GroupProps): react.JSX.Element;
interface CustomSetting extends BaseSettingItem {
    type: "custom";
    children: ReactNode;
}
interface ButtonSetting extends ButtonProps, BaseSettingItem {
    type: "button";
}

type NotificationType = "warning" | "error" | "info" | "success";
interface ButtonActions extends ButtonProps {
    label: string;
    dontClose?: boolean;
    dontCloseOnActionIfHoldingShiftKey?: boolean;
}
interface Notification {
    /** A unique id for the notification, will not be shown if another notification with the same id is already being shown */
    id: string;
    /** The title of the notification */
    title?: string;
    /** The content of the notification */
    content?: string | ReactNode;
    /** The type of the notification which changes the color and icon */
    type?: NotificationType;
    /** How long the notification should be shown in milliseconds */
    duration?: number;
    /** An array of button actions to add to the notification */
    actions?: ButtonActions[];
    /** A React component to use as a custom icon for the notification */
    icon?: react__default.ComponentType<any>;
    /** A callback which is run when the notification is closed manually or automatically */
    onClose?(): void;
    [key: symbol]: boolean;
}

type ChangelogEntryType = "progress" | "fixed" | "added" | "improved";
interface ChangelogEntry {
    type: ChangelogEntryType;
    blurb?: string;
    title: string;
    items: string[];
}
interface ChangelogProps {
    transitionState?: number;
    /** What to show in the modal footer */
    footer?: ReactNode;
    /** Title to show in the modal header */
    title?: ReactNode;
    /** Title to show below the main header */
    subtitle?: ReactNode;
    /** A callback to fire when the changelog modal is closed */
    onClose?(): void;
    /** Youtube link or url of a video file to use as the banner */
    video?: string;
    /** URL to use for the video freeze-frame poster */
    poster?: string;
    /** URL to an image to display as the banner of the modal */
    banner?: string;
    /** Text to show in the body of the modal before the list of changes */
    blurb?: string;
    /** List of changes to show (see description for details) */
    changes?: ChangelogEntry[];
}

interface FileFilter {
    name: string;
    extensions: string[];
}
interface DialogOptions {
    /** Determines whether the dialog should open or save files */
    mode: "open" | "save";
    /** The path the dialog should show on launch */
    defaultPath: string;
    /** An array of [file filters](https://www.electronjs.org/docs/latest/api/structures/file-filter) */
    filters: FileFilter[];
    /** A title for the titlebar */
    title: string;
    /** A message for the dialog */
    message: string;
    /** Whether the user should be prompted when overwriting a file */
    showOverwriteConfirmation: boolean;
    /** Whether hidden files should be shown in the dialog */
    showHiddenFiles: boolean;
    /** Whether the user should be prompted to create non-existent folders */
    promptToCreate: boolean;
    /** Whether the user should be able to select a directory as a target */
    openDirectory: boolean;
    /** Whether the user should be able to select a file as a target */
    openFile: boolean;
    /** Whether the user should be able to select multiple targets */
    multiSelections: boolean;
    /** Whether the dialog should act as a modal to the main window */
    modal: boolean;
}

const ModalSizes: Readonly<{
    SMALL: "bd-modal-small";
    MEDIUM: "bd-modal-medium";
    LARGE: "bd-modal-large";
    DYNAMIC: "";
}>;
const ModalStyles: Readonly<{
    STANDARD: "bd-modal-standard";
    CUSTOM: "";
}>;
type RootProps = PropsWithChildren<{
    className?: string;
    transitionState?: number;
    size?: typeof ModalSizes[keyof typeof ModalSizes];
    style?: typeof ModalStyles[keyof typeof ModalStyles];
}>;
function ModalRoot({ className, transitionState, children, size, style }: RootProps): react.JSX.Element;
namespace ModalRoot {
    var Sizes: Readonly<{
        SMALL: "bd-modal-small";
        MEDIUM: "bd-modal-medium";
        LARGE: "bd-modal-large";
        DYNAMIC: "";
    }>;
    var Styles: Readonly<{
        STANDARD: "bd-modal-standard";
        CUSTOM: "";
    }>;
}

type ConfirmationModalOptions = PropsWithChildren<{
    transitionState?: number;
    /** A callback to run when exiting the modal */
    onClose?(): void;
    /** A callback to run when clicking the submit button */
    onConfirm?(): void;
    /** A callback to run when clicking the cancel button */
    onCancel?(): void;
    /** Called immediately on render */
    onCloseCallback?(): void;
    /** The size of the modal */
    size?: typeof ModalRoot.Sizes[keyof typeof ModalRoot.Sizes];
    /** Classes to apply to the modal */
    className?: string;
    /** Text to show at the top of the modal */
    header?: string;
    /** Text for the confirmation/submit button */
    confirmText?: string;
    /** Text for the cancel button */
    cancelText?: string | null;
    /** Whether the main button should be red or not */
    danger?: boolean;
    key?: string | number;
}>;

interface SettingsPanelProps {
    /** An array of settings to show */
    settings: Array<Setting | SettingsCategory>;
    /** A function to call on every change */
    onChange?: (categoryId: string | null, settingId: string, value: any) => void;
    /** Optionally used to recall drawer states */
    getDrawerState?: (categoryId: string, defaultShown: boolean) => boolean;
    /** Optionally used to save drawer states */
    onDrawerToggle?: (categoryId: string, shown: boolean) => void;
}
/**
 * `UI` is a utility class for creating user interfaces. An instance is available on {@link BdApi}.
 */
class UI {
    /** @ignore */
    constructor();
    /**
     * Shows a generic but very customizable modal.
     *
     * @param title Title of the modal
     * @param content A string of text to display in the modal
     */
    alert(title: string, content: string | ReactElement | ReadonlyArray<string | ReactElement>): void;
    /**
     * Shows a customizable notification to the user.
     * @returns An object with `isVisible` and `close` methods
     */
    showNotification(options: Notification): {
        id: string;
        isVisible: () => boolean;
        close: () => void;
    } | undefined;
    /**
     * Creates a tooltip to automatically show on hover.
     *
     * @param node DOM node to monitor and show the tooltip on
     * @param content String to show in the tooltip
     * @param options Additional options for the tooltip
     * @returns The tooltip that was generated
     */
    createTooltip(node: HTMLElement, content: string | HTMLElement, options?: TooltipOptions): Tooltip;
    /**
     * Shows a generic but very customizable confirmation modal with optional confirm and cancel callbacks.
     *
     * @param title Title of the modal.
     * @param content Single or mixed array of React elements and strings. Everything is wrapped in Discord's `TextElement` component so strings will show and render properly.
     * @param [options] Options to modify the modal
     */
    showConfirmationModal(title: string, content: string | ReactElement | ReadonlyArray<string | ReactElement>, options?: ConfirmationModalOptions): string | number | void;
    /**
     * Shows a changelog modal in a similar style to Discord's. Customizable with images, videos, colored sections and supports markdown.
     *
     * The changes option is a array of objects that have this typing:
     * ```ts
     * interface Changes {
     *     title: string;
     *     type: "fixed" | "added" | "progress" | "improved";
     *     items: Array<string>;
     *     blurb?: string;
     * }
     * ```
     *
     * @param options Information to display in the modal
     * @returns The key used for this modal
     */
    showChangelogModal(options: ChangelogProps): string | number;
    /**
     * Shows a modal for joining a guild like you would natively through Discord.
     * @param inviteCode The invite code
     */
    showInviteModal(inviteCode: string): Promise<void>;
    /**
     * Shows a toast similar to android towards the bottom of the screen.
     *
     * @param content The string to show in the toast
     * @param options Options for the toast
     */
    showToast(content: string, options?: ToastOptions): void;
    /**
     * Shows a notice above Discord's chat layer.
     *
     * @param content Content of the notice
     * @param options Options for the notice
     * @returns A callback for closing the notice. Passing `true` as first parameter closes immediately without transitioning out.
     */
    showNotice(content: string, options?: NoticeOptions): ((immediately?: boolean) => void) | undefined;
    /**
     * Gives access to the [Electron Dialog](https://www.electronjs.org/docs/latest/api/dialog/) api.
     * Returns a `Promise` that resolves to an `object` that has a `boolean` cancelled and a `filePath` string for saving and a `filePaths` string array for opening.
     *
     * @param options Options object to configure the dialog
     * @returns The result of the dialog
     */
    openDialog(options: Partial<DialogOptions>): Promise<any>;
    /**
     * Creates a single setting wrapped in a setting item that has a name and note.
     * The shape of the object should match the props of the component you want to render, check the
     * `BdApi.Components` section for details.
     * @returns A SettingItem with a an input as the child
     */
    buildSettingItem(setting: Setting | CustomSetting | ButtonSetting): react.JSX.Element | null;
    /**
     * Creates a settings panel (react element) based on json-like data.
     *
     * The `settings` array here is an array of the same settings types described in `buildSetting` above.
     * However, this API allows one additional setting "type" called `category`. This has the same properties
     * as the Group React Component found under the `Components` API.
     *
     * `onChange` will always be given 3 arguments: category id, setting id, and setting value. In the case
     * that you have settings on the "root" of the panel, the category id is `null`. Any `onChange`
     * listeners attached to individual settings will fire before the panel-level change listener.
     *
     * `onDrawerToggle` is given 2 arguments: category id, and the current shown state. You can use this to
     * save drawer states.
     *
     * `getDrawerState` is given 2 arguments: category id, and the default shown state. You can use this to
     * recall a saved drawer state.
     *
     * @param props
     * @returns React element usable for a settings panel
     */
    buildSettingsPanel({ settings, onChange, onDrawerToggle, getDrawerState }: SettingsPanelProps): react.CElement<ErrorBoundaryProps, ErrorBoundary>;
}

type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

function clsx(...inputs: ClassValue[]): string;

function comparator(currentVersion: string, remoteVersion: string): 1 | 0 | -1;

function debounce<T extends (...args: any[]) => any>(executor: T, delay: number): (...args: Parameters<T>) => void;

function extend(target: object, ...extenders: object[]): object;

type TreeFilter = (o: any) => boolean | any;
interface FindInTreeOptions {
    /** An array of strings to use as keys that are allowed to be walked on. Null value indicates all keys are walkable. */
    walkable?: string[] | null;
    /** Array of strings to use as keys to exclude from the search, most helpful when `walkable = null`. */
    ignore?: string[];
}
/**
* Finds a value, subobject, or array from a tree that matches a specific filter.
* @param tree Tree that should be walked
* @param searchFilter Filter to check against each object and subobject
* @param options Additional options to customize the search
*/
function findInTree(tree: any, searchFilter: TreeFilter | string, { walkable, ignore }?: FindInTreeOptions): any | undefined;

interface User {
    avatar: string;
    avatarDecorationData: null | {
        asset: string;
        skuId: string;
    };
    banner: string | null;
    bot: boolean;
    clan: string | null;
    desktop: boolean;
    discriminator: string;
    displayName: string;
    email: string | null;
    flags: number;
    globalName: string;
    guildMemberAvatars: object;
    hasAnyStaffLevel(): boolean;
    hasBouncedEmail: boolean;
    hasFlag(f: number): boolean;
    id: string;
    isStaff(): boolean;
    isStaffPersonal(): boolean;
    mfaEnabled: boolean;
    mobile: boolean;
    nsfwAllowed: boolean | undefined;
    personalConnectionId: null | string;
    phone: string | null;
    premiumType: number | undefined;
    premiumUsageFlags: number;
    primaryGuild: string | null;
    publicFlags: number;
    purchasedFlags: number;
    system: boolean;
    username: string;
    verified: boolean;
    getAvatarURL(a: unknown, size: number, b: boolean): string;
    readonly avatarDecoration: null | {
        asset: string;
        skuId: string;
    };
    readonly createdAt: Date;
    readonly isProvisional: boolean;
    readonly tag: string;
}
interface PermissionOverwrite {
    allow: bigint;
    deny: bigint;
    id: string;
    type: number;
}
interface Channel {
    application_id: string | undefined;
    flags_: number;
    guild_id: string | null;
    icon: string | undefined;
    id: string;
    isMessageRequest: boolean;
    isMessageRequestTimestamp: boolean | null;
    isSpam: boolean;
    lastMessageId: string;
    lastPinTimestamp: string;
    name: string;
    nicks: {
        [key: string]: string;
    };
    ownerId: string;
    rawRecipients: User[];
    recipientFlags: number;
    recipients: string[];
    safetyWarnings: string[];
    type: number;
    readonly accessPermissions: bigint;
    readonly bitrate: number;
    readonly flags: number;
    readonly isHDStreamSplashed: boolean;
    readonly nsfw: boolean;
    readonly permissionOverwrites: {
        [id: string]: PermissionOverwrite;
    };
    readonly position: number;
    readonly rateLimitPerUser: number;
    readonly topic: string;
    readonly userLimit: number;
}
interface Guild {
    afkChannelId: null;
    afkTimeout: number;
    application_id: string | null;
    banner: string;
    clan: null;
    defaultMessageNotifications: number;
    description: string;
    discoverySplash: null;
    explicitContentFilter: number;
    features: Set<string>;
    homeHeader: null;
    hubType: null;
    icon: string;
    id: string;
    joinedAt: Date;
    latestOnboardingQuestionId: null;
    maxMembers: number;
    maxStageVideoChannelUsers: number;
    maxVideoChannelUsers: number;
    mfaLevel: number;
    name: string;
    nsfwLevel: number;
    ownerId: string;
    preferredLocale: string;
    premiumProgressBarEnabled: true;
    premiumSubscriberCount: number;
    premiumTier: number;
    publicUpdatesChannelId: string;
    rulesChannelId: string;
    safetyAlertsChannelId: string;
    splash: string;
    systemChannelFlags: number;
    systemChannelId: string;
    vanityURLCode: null;
    verificationLevel: number;
    readonly acronym: string;
}

interface FluxStore {
    _dispatchToken: string;
    _isInitialized: boolean;
    getName(): string;
    getDispatchToken(): string;
    initialize(): void;
    initializeIfNeeded(): void;
    emitChange(): void;
    hasChangeCallbacks(): boolean;
    addChangeListener(listener: () => void): void;
    removeChangeListener(listener: () => void): void;
    addReactChangeListener(listener: () => void): void;
    removeReactChangeListener(listener: () => void): void;
    syncWith(stores: FluxStore[], emitChange: boolean, delay?: number): void;
    waitFor(...stores: FluxStore[]): void;
    [key: PropertyKey]: any;
}
type CommonlyUsedStores = ("UserStore" | "GuildStore" | "SelectedGuildStore" | "GuildMemberStore" | "ChannelStore" | "SelectedChannelStore" | "MessageStore");
interface BaseTooltipProps {
    allowOverflow?: boolean;
    color?: string;
    forceOpen?: boolean;
    hideOnClick?: boolean;
    overflowOnly?: boolean;
    position?: "top" | "bottom" | "left" | "right";
    shouldShow?: boolean;
    spacing?: number;
    "aria-label"?: string;
}
interface TooltipStatic {
    Colors: Record<string, string>;
    defaultProps: Required<BaseTooltipProps>;
}
interface TooltipProps extends BaseTooltipProps {
    text?: string;
    children: React.FunctionComponent;
}
type DiscordTooltip = React.ComponentType<TooltipProps> & TooltipStatic;

interface Require {
    <T = any>(id: PropertyKey): T;
    d(target: object, exports: Record<string, () => any>): void;
    c: Record<PropertyKey, Module>;
    m: Record<PropertyKey, RawModule>;
    e(id: PropertyKey): Promise<unknown>;
    l(url: string, onLoad: (event: Event) => void, key: string, id: string): void;
}
interface Module<T extends any = any> {
    id: PropertyKey;
    exports: T;
    declarations: Record<string, any>;
    loaded: boolean;
}
type RawModule = ((module: Module, exports: object, require: Require) => void) & {
    __BD__?: {
        runListeners: (module: Module, exports: object, require: Require) => void;
        originalModule: RawModule;
    };
    __early_patched__?: boolean;
    __raw_module__?: () => RawModule;
};
type ModuleFilter = (exported: any, module: Module, id: PropertyKey) => any;
type ExportedOnlyFilter = (exported: any) => any;
type Options = {
    searchExports?: boolean;
    defaultExport?: boolean;
    searchDefault?: boolean;
    raw?: boolean;
    fatal?: boolean;
    firstId?: PropertyKey;
    cacheId?: string | null;
    declarationFilter?: ExportedOnlyFilter;
};
type LazyOptions = Options & {
    signal?: AbortSignal;
};
type MangledOptions = Omit<Options, "declarationFilter"> & {
    mapDeclarations?: boolean;
};
type BulkQueries = Options & {
    filter: ModuleFilter;
    all?: boolean;
    map?: Record<string, ExportedOnlyFilter>;
    mapDeclarations?: boolean;
};
type WithKeyOptions = Options & {
    target?: any;
};

function forceLoad(id: string | number): Promise<any[]>;

function mapObject<T extends object>(module: any, mappers: Record<keyof T, ExportedOnlyFilter>): T;

/**
 * `Utils` is a utility containing commonly reused functions. An instance is available on {@link BdApi}.
 */
class Utils {
    /** @ignore */
    constructor();
    /**
     * Finds a value, subobject, or array from a tree that matches a specific filter. This is a DFS.
     *
     * @param tree Tree that should be walked
     * @param searchFilter Filter to check against each object and subobject
     * @param options Additional options to customize the search
     */
    findInTree: typeof findInTree;
    /**
     * Loads the module ids within a chunk
     *
     * @param id Module with the chunk id.
     * @returns Resolved chunk module
     */
    forceLoad: typeof forceLoad;
    /**
     * Deep extends an object with a set of other objects. Objects later in the list
     * of `extenders` have priority, that is to say if one sets a key to be a primitive,
     * it will be overwritten with the next one with the same key. If it is an object,
     * and the keys match, the object is extended. This happens recursively.
     *
     * @param extendee Object to be extended
     * @param extenders Objects to extend with
     * @returns A reference to `extendee`
     */
    extend: typeof extend;
    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * `delay` milliseconds. It is called at the end of the sequence (trailing edge).
     *
     * Adapted from the version by David Walsh (https://davidwalsh.name/javascript-debounce-function)
     *
     * @param executor The function to be debounced
     * @param delay Number of ms to delay calls
     * @returns A debounced version of the function
     */
    debounce: typeof debounce;
    /**
     * Takes a string of HTML and escapes it using the browser's own escaping mechanism
     *
     * @param html HTML to be escaped
     * @returns Escaped HTML string
     */
    escapeHTML(html: string): string;
    /**
     * Builds a classname string from any number of arguments. This includes arrays and objects.
     * When given an array all values from the array are added to the list.
     * When given an object they keys are added as the classnames if the value is truthy.
     * Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
     *
     * @param argument Anything that should be used to add classnames
     * @returns Joined classname
     */
    className: typeof clsx;
    /**
     * Gets a nested value (if it exists) of an object safely. path should be something like `key.key2.key3`.
     * Numbers can be used for arrays as well like `key.key2.array.0.id`.
     * @param object Object to get nested value from
     * @param path Key path to the desired value
     */
    getNestedValue<T extends Record<string | number | symbol, unknown>, R = any>(object: T, path: string): R;
    /**
     * Compares two semantic versions, e.g. "1.0.0"
     * @param currentVersion The current installed version
     * @param remoteVersion The version to compare against
     * @returns 0 indicates equal, -1 indicates left hand greater, 1 indicates right hand greater
     */
    semverCompare: typeof comparator;
    /**
     * Maps the properties of one object onto another based on a set of filters
     */
    mapObject: typeof mapObject;
    /**
     * A class which can be listened to for changes
     */
    Store: typeof Store;
}

type WithOptions<T, B extends WebpackOptions> = [...T[], B] | T[];
interface WebpackOptions extends Options {
    first?: boolean;
}
/**
 * `Webpack` is a utility class for getting internal webpack modules. An instance is available on {@link BdApi}.
 * This is extremely useful for interacting with the internals of Discord.
 */
class Webpack {
    /** @ignore */
    constructor();
    /**
     * A Proxy that returns the module source by ID.
     */
    modules: Record<PropertyKey, RawModule>;
    /**
     * An object containing all of Discord's internal stores which can be accessed by their name.
     */
    Stores: Record<CommonlyUsedStores | (string & {
        _name_?: "";
    }), FluxStore>;
    /**
     * Series of {@link Filters} to be used for finding webpack modules.
     */
    Filters: {
        /** Generates a function that filters by a set of properties. */
        byKeys(...keys: string[]): ExportedOnlyFilter;
        /** Generates a function that filters by a set of properties on the object's prototype. */
        byPrototypeKeys(...props: string[]): ExportedOnlyFilter;
        /** Generates a function that filters by a regex. */
        byRegex(regex: RegExp): ExportedOnlyFilter;
        /** Generates a function that filters by source code content. */
        bySource(...searches: Array<RegExp | string>): ModuleFilter;
        /** Generates a function that filters by strings. */
        byStrings(...strings: string[]): ExportedOnlyFilter;
        /** Generates a function that filters by the `displayName` property. */
        byDisplayName(name: string): ExportedOnlyFilter;
        /** Generates a function that filters by a specific internal Store name. */
        byStoreName(name: string): ExportedOnlyFilter;
        /** Generates a combined function from a list of filters. */
        combine(...filters: ModuleFilter[]): ModuleFilter;
        /** Generates a filter that returns the opposite of the passed filter. */
        not(filter: ModuleFilter): ModuleFilter;
        /** Generates a filter to search React functional components. */
        byComponentType(filter: ExportedOnlyFilter): ExportedOnlyFilter;
    };
    getWithKey(filter: ExportedOnlyFilter, options?: WithKeyOptions): void | Generator<any, void, unknown>;
    getModule<T extends any>(filter: ModuleFilter, options?: WebpackOptions): void | T;
    getModules<T extends any[]>(filter: ModuleFilter, options?: WebpackOptions): void | T;
    getBulk<T extends any[]>(...queries: BulkQueries[]): T;
    getBulkKeyed<T extends object>(queries: Record<keyof T, BulkQueries>): T;
    waitForModule<T>(filter: ModuleFilter, options?: LazyOptions): void | Promise<T | undefined>;
    getByRegex<T>(regex: RegExp, options?: WebpackOptions): void | T;
    getAllByRegex<T extends any[]>(regex: RegExp, options?: WebpackOptions): void | T;
    getMangled<T extends object>(filter: ModuleFilter | string | RegExp, mangled: Record<keyof T, ExportedOnlyFilter>, options?: MangledOptions): void | T;
    getByPrototypeKeys<T>(...prototypes: WithOptions<string, WebpackOptions>): void | T;
    getAllByPrototypeKeys<T extends any[]>(...prototypes: WithOptions<string, WebpackOptions>): void | T;
    getByKeys<T>(...props: WithOptions<string, WebpackOptions>): void | T;
    getAllByKeys<T extends any[]>(...props: WithOptions<string, WebpackOptions>): void | T;
    getByStrings<T>(...strings: WithOptions<string, WebpackOptions>): void | T;
    getAllByStrings<T extends any[]>(...strings: WithOptions<string, WebpackOptions>): void | T;
    getBySource<T>(...searches: WithOptions<string | RegExp, WebpackOptions>): void | T;
    getAllBySource<T extends object[]>(...searches: WithOptions<string | RegExp, WebpackOptions>): void | T;
    getStore(name: string): FluxStore | undefined;
    getById(id: PropertyKey, options?: WebpackOptions): void | object;
}

type DiscordIconProps = {
    color?: string;
    className?: string;
} & ({
    size?: keyof typeof sizes;
} | {
    size: "custom";
    width: react__default.CSSProperties["width"];
    height: react__default.CSSProperties["height"];
});
const sizes: {
    readonly xxs: 12;
    readonly xs: 16;
    readonly sm: 18;
    readonly md: 24;
    readonly lg: 32;
    readonly custom: undefined;
    readonly refresh_sm: 20;
};

type MenuItemColor = "default" | "danger" | "premium-gradient";
interface BaseMenuItemProps extends Record<string, any> {
    id: string;
    disabled?: boolean;
    action?(event: React.MouseEvent): void;
    children?: React.ReactNode;
    icon?: React.FunctionComponent<DiscordIconProps>;
    color?: MenuItemColor;
    subtext?: string;
    focusedClassName?: string;
    className?: string;
    keepItemStyles?: boolean;
    dontCloseOnActionIfHoldingShiftKey?: boolean;
    imageUrl?(props: unknown): string;
}
interface MenuCheckboxItemProps {
    id: string;
    label: string;
    disabled?: boolean;
    subtext?: React.ReactNode;
    action?(event: React.MouseEvent): void;
    checked: boolean;
}
interface MenuControlProps {
    disabled?: boolean;
    isFocused: boolean;
    onClose(): void;
}
interface MenuRadioItemProps extends MenuCheckboxItemProps {
    group: string;
}
interface MenuControlRef {
    activate(): void;
    blur(): void;
    focus(): void;
}
interface MenuControlItemProps {
    id: string;
    label?: string;
    disabled?: boolean;
    control(props: MenuControlProps, ref: {
        ref: null | void | MenuControlRef;
    }): React.ReactElement;
}
interface MenuItemSeparator {
    type: "separator";
}
interface MenuItemSubmenu extends BaseMenuItemProps {
    type: "submenu";
    render?: MenuItem[];
    items?: MenuItem[];
    danger?: boolean;
    onClick?(event: React.MouseEvent): void;
}
interface MenuItemDefault extends BaseMenuItemProps {
    type?: "item";
    danger?: boolean;
    onClick?(event: React.MouseEvent): void;
}
interface MenuItemRadio extends MenuRadioItemProps {
    type: "radio";
    danger?: boolean;
    onClick?(event: React.MouseEvent): void;
    active?: boolean;
}
interface MenuItemCheckbox extends MenuCheckboxItemProps {
    type: "toggle";
    danger?: boolean;
    onClick?(event: React.MouseEvent): void;
    active?: boolean;
}
interface MenuItemControl extends MenuControlItemProps {
    type: "control";
}
interface MenuItemGroup {
    type: "group";
    items: MenuItem[];
}
type MenuItem = MenuItemSeparator | MenuItemSubmenu | MenuItemDefault | MenuItemRadio | MenuItemCheckbox | MenuItemControl;
interface MenuRenderProps {
    config: MenuConfig & {
        context: "APP";
    };
    context: "APP";
    onHeightUpdate: () => void;
    position: "right" | "left";
    target: Element;
    theme: string;
}
interface MenuConfig {
    /** Default position for the menu */
    position?: "right" | "left";
    /** Default alignment for the menu */
    align?: "top" | "bottom";
    /** Function to run when the menu is closed */
    onClose?(): void;
}
type PatchCallback = (res: React.ReactElement<React.PropsWithChildren<MenuRenderProps>, React.ComponentType<React.PropsWithChildren<MenuRenderProps>>>, props: MenuRenderProps, instance?: React.Component<MenuRenderProps>) => void;
/**
 * `ContextMenu` is a module to help patch and create context menus. An instance is available on {@link BdApi}.
 */
class ContextMenu {
    /** @ignore */
    constructor();
    /**
     * Allows you to patch a given context menu. Acts as a wrapper around the `Patcher`.
     *
     * @param navId Discord's internal `navId` used to identify context menus
     * @param callback Callback function that accepts the React render tree
     * @returns A function that automatically unpatches
     */
    patch(navId: string | RegExp, callback: PatchCallback): () => void;
    /**
     * Allows you to remove the patch added to a given context menu.
     *
     * @param navId The original `navId` from patching
     * @param callback The original callback from patching
     */
    unpatch(navId: string | RegExp, callback: PatchCallback): void;
    /**
     * Builds a single menu item. The only prop shown here is the type, the rest should
     * match the actual component being built. View those to see what options exist
     * for each, they often have less in common than you might think.
     *
     * @param props Props used to build the item
     * @returns The created component
     *
     * @example
     * // Creates a single menu item that prints "MENU ITEM" on click
     * ContextMenu.buildItem({
     *      label: "Menu Item",
     *      action: () => {console.log("MENU ITEM");}
     * });
     *
     * @example
     * // Creates a single toggle item that starts unchecked
     * // and print the new value on every toggle
     * ContextMenu.buildItem({
     *      type: "toggle",
     *      label: "Item Toggle",
     *      checked: false,
     *      action: (newValue) => {console.log(newValue);}
     * });
     */
    buildItem(props: MenuItem): react.FunctionComponentElement<any> | react.FunctionComponentElement<{}>;
    /**
     * Creates the all the items **and groups** of a context menu recursively.
     * There is no hard limit to the number of groups within groups or number
     * of items in a menu.
     *
     * @param setup Array of item props used to build items. See {@link ContextMenu.buildItem}.
     * @returns Array of the created component
     *
     * @example
     * // Creates a single item group item with a toggle item
     * ContextMenu.buildMenuChildren([{
     *      type: "group",
     *      items: [{
     *          type: "toggle",
     *          label: "Item Toggle",
     *          active: false,
     *          action: (newValue) => {console.log(newValue);}
     *      }]
     * }]);
     *
     * @example
     * // Creates two item groups with a single toggle item each
     * ContextMenu.buildMenuChildren([{
     *     type: "group",
     *     items: [{
     *         type: "toggle",
     *         label: "Item Toggle",
     *         active: false,
     *         action: (newValue) => {
     *             console.log(newValue);
     *         }
     *     }]
     * }, {
     *     type: "group",
     *     items: [{
     *         type: "toggle",
     *         label: "Item Toggle",
     *         active: false,
     *         action: (newValue) => {
     *             console.log(newValue);
     *         }
     *     }]
     * }]);
     */
    buildMenuChildren(setup: ReadonlyArray<MenuItem | MenuItemGroup>): (react.ReactElement<unknown, string | react.JSXElementConstructor<any>> | react.FunctionComponentElement<any> | react.FunctionComponentElement<{}>)[];
    /**
     * Creates the menu *component* including the wrapping `ContextMenu`.
     * Calls {@link ContextMenu.buildMenuChildren} under the covers.
     * Used to call in combination with {@link ContextMenu.open}.
     *
     * @param setup Array of item props used to build items. See {@link ContextMenu.buildMenuChildren}.
     * @returns The unique context menu component
     */
    buildMenu(setup: ReadonlyArray<MenuItem | MenuItemGroup>): (props: MenuRenderProps) => react.FunctionComponentElement<react.PropsWithChildren<MenuRenderProps>>;
    /**
     * Function that allows you to open an entire context menu. Recommended to build the menu with this module.
     *
     * @param event The context menu event. This can be emulated, requires target, and all X, Y locations.
     * @param menuComponent Component to render. This can be any React component or output of {@link ContextMenu.buildMenu}.
     * @param config Configuration/props for the context menu
     */
    open(event: MouseEvent, menuComponent: React.ComponentType<MenuRenderProps>, config?: MenuConfig): any;
    /**
     * Closes the current opened context menu immediately.
     */
    close(): void;
    Separator: react.FC<{}>;
    CheckboxItem: react.FC<react.PropsWithChildren<MenuCheckboxItemProps>>;
    RadioItem: react.FC<react.PropsWithChildren<MenuRadioItemProps>>;
    ControlItem: react.FC<react.PropsWithChildren<MenuControlItemProps>>;
    Group: react.FC<{
        children?: react.ReactNode | undefined;
    }>;
    Item: react.FC<react.PropsWithChildren<BaseMenuItemProps>>;
    Menu: react.FC<react.PropsWithChildren<MenuRenderProps>>;
}

interface DryReadableStream {
    read(): Promise<ReadableStreamReadResult<Uint8Array<ArrayBuffer>>>;
    cancel(reason?: any): Promise<void>;
}
type NativeRequestMethod = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD" | "CONNECT" | "TRACE";
interface NativeRequestInit {
    body?: BodyInit | null;
    headers?: HeadersInit;
    keepalive?: boolean;
    method?: NativeRequestMethod;
    redirect?: RequestRedirect;
    signal?: AbortSignal | null;
    timeout?: number;
    maxRedirects?: number;
    rejectUnauthorized?: boolean;
}
interface DriedResponse {
    body: DryReadableStream | null;
    url: string;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    redirected: boolean;
}

class HydratingResponse extends Response {
    #private;
    constructor(dried: DriedResponse);
    get url(): string;
    get redirected(): boolean;
}
class Net {
    /** @ignore */
    constructor();
    fetch(input: string | URL | Request, init?: NativeRequestInit): Promise<HydratingResponse>;
}

const SpinnerType: Readonly<{
    WANDERING_CUBES: "wandering-cubes";
    CHASING_DOTS: "chasing-dots";
    PULSING_ELLIPSIS: "pulsing-ellipsis";
    SPINNING_CIRCLE: "spinning-circle";
    SPINNING_CIRCLE_SIMPLE: "spinning-circle-simple";
    LOW_MOTION: "low-motion";
}>;
type SpinnerTypes = typeof SpinnerType[keyof typeof SpinnerType];
interface SpinnerProps {
    type?: SpinnerTypes;
    animated?: boolean;
    className?: string;
    itemClassName?: string;
    "aria-label"?: string;
}

interface ColorpickerProps {
    value: Color;
    onChange?(newValue: HexString): void;
    colors?: Color[];
    defaultValue?: Color;
    disabled?: boolean;
}
function ColorPicker(props: ColorpickerProps): react.JSX.Element;

interface SelectOption {
    id?: string;
    value: any;
    label: string;
}
interface SelectProps {
    value?: any;
    options: SelectOption[];
    style?: "transparent" | "default";
    onChange?(newValue: any): void;
    disabled?: boolean;
}
function Select(props: SelectProps): react.JSX.Element;

type SettingItemProps = PropsWithChildren<{
    id: string;
    name?: string;
    note?: string;
    inline?: boolean;
}>;
function SettingItem(props: SettingItemProps): react.JSX.Element;

interface KeybindProps {
    value: string[];
    onChange?(newValue: string[]): void;
    max?: number;
    clearable?: boolean;
    disabled?: boolean;
}
function Keybind(props: KeybindProps): react.JSX.Element;

interface NumberInputProps {
    value: number | string;
    min?: number;
    max?: number;
    step?: number;
    onChange?(newValue: number | string): void;
    disabled?: boolean;
}
function Number(props: NumberInputProps): react.JSX.Element;

interface RadioOption {
    name: string;
    value: any;
    color?: string;
    description?: string;
    /** @deprecated */
    desc?: string;
}
interface RadioProps {
    name?: string;
    value: any;
    options: RadioOption[];
    onChange?(newValue: any): void;
    disabled?: boolean;
}
function Radio(props: RadioProps): react.JSX.Element;

interface SearchProps {
    onChange?(event: ChangeEvent | {
        target: {
            value: string;
        };
    }): void;
    className?: string;
    placeholder?: string;
    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;
}
function Search(props: SearchProps): react.JSX.Element;

interface SliderMarker {
    value: number;
    label: string;
}
interface SliderProps {
    value: number | string;
    min: number;
    max: number;
    step?: number;
    onChange?(newValue: number | string): void;
    disabled?: boolean;
    units?: string;
    markers?: Array<number | SliderMarker>;
}
function Slider(props: SliderProps): react.JSX.Element;

interface SwitchProps {
    id?: string;
    value: boolean;
    disabled?: boolean;
    onChange?(newValue?: boolean): void;
    internalState?: boolean;
}
function Switch(props: SwitchProps): react.JSX.Element;

interface TextboxProps {
    value: string;
    maxLength?: number;
    placeholder?: string;
    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;
    onChange?(newValue: string): void;
    disabled?: boolean;
}
function Textbox(props: TextboxProps): react.JSX.Element;

const TextColors: Readonly<{
    STANDARD: "bd-text-normal";
    MUTED: "bd-text-muted";
    ERROR: "bd-text-error";
    BRAND: "bd-text-brand";
    LINK: "bd-text-link";
    HEADER_PRIMARY: "bd-header-primary";
    HEADER_SECONDARY: "bd-header-secondary";
    STATUS_YELLOW: "bd-text-yellow";
    STATUS_GREEN: "bd-text-green";
    STATUS_RED: "bd-text-red";
    ALWAYS_WHITE: "bd-text-white";
    CUSTOM: null;
}>;
const TextSizes: Readonly<{
    SIZE_10: "bd-text-10";
    SIZE_12: "bd-text-12";
    SIZE_14: "bd-text-14";
    SIZE_16: "bd-text-16";
    SIZE_20: "bd-text-20";
    SIZE_24: "bd-text-24";
    SIZE_32: "bd-text-32";
}>;
type TextProps = PropsWithChildren<{
    tag?: ElementType<HTMLAttributes<HTMLElement>>;
    className?: string;
    color?: typeof TextColors[keyof typeof TextColors];
    size?: typeof TextSizes[keyof typeof TextSizes];
    selectable?: boolean;
    strong?: boolean;
    style?: CSSProperties;
    [other: string]: any;
}>;
function Text(props: TextProps): react.JSX.Element;
namespace Text {
    var Colors: Readonly<{
        STANDARD: "bd-text-normal";
        MUTED: "bd-text-muted";
        ERROR: "bd-text-error";
        BRAND: "bd-text-brand";
        LINK: "bd-text-link";
        HEADER_PRIMARY: "bd-header-primary";
        HEADER_SECONDARY: "bd-header-secondary";
        STATUS_YELLOW: "bd-text-yellow";
        STATUS_GREEN: "bd-text-green";
        STATUS_RED: "bd-text-red";
        ALWAYS_WHITE: "bd-text-white";
        CUSTOM: null;
    }>;
    var Sizes: Readonly<{
        SIZE_10: "bd-text-10";
        SIZE_12: "bd-text-12";
        SIZE_14: "bd-text-14";
        SIZE_16: "bd-text-16";
        SIZE_20: "bd-text-20";
        SIZE_24: "bd-text-24";
        SIZE_32: "bd-text-32";
    }>;
}

const FlexDirection: Readonly<{
    VERTICAL: "bd-flex-vertical";
    HORIZONTAL: "bd-flex-horizontal";
    HORIZONTAL_REVERSE: "bd-flex-reverse";
}>;
const FlexJustify: Readonly<{
    START: "bd-flex-justify-start";
    END: "bd-flex-justify-end";
    CENTER: "bd-flex-justify-center";
    BETWEEN: "bd-flex-justify-between";
    AROUND: "bd-flex-justify-around";
}>;
const FlexAlign: Readonly<{
    START: "bd-flex-align-start";
    END: "bd-flex-align-end";
    CENTER: "bd-flex-align-center";
    STRETCH: "bd-flex-align-stretch";
    BASELINE: "bd-flex-align-baseline";
}>;
const FlexWrap: Readonly<{
    NO_WRAP: "bd-flex-no-wrap";
    WRAP: "bd-flex-wrap";
    WRAP_REVERSE: "bd-flex-wrap-reverse";
}>;
function FlexChild(props: {
    className?: string;
    [x: string]: any;
}): react.JSX.Element;
type FlexProps = PropsWithChildren<{
    id?: string;
    className?: string;
    style?: CSSProperties;
    shrink?: number;
    grow?: number;
    basis?: "auto";
    justify?: typeof FlexJustify[keyof typeof FlexJustify];
    direction?: typeof FlexDirection[keyof typeof FlexDirection];
    align?: typeof FlexAlign[keyof typeof FlexAlign];
    wrap?: typeof FlexWrap[keyof typeof FlexWrap];
    onClick?: MouseEventHandler<HTMLDivElement>;
}>;
function Flex(props: FlexProps): react.JSX.Element;
namespace Flex {
    var Child: typeof FlexChild;
    var Direction: Readonly<{
        VERTICAL: "bd-flex-vertical";
        HORIZONTAL: "bd-flex-horizontal";
        HORIZONTAL_REVERSE: "bd-flex-reverse";
    }>;
    var Align: Readonly<{
        START: "bd-flex-align-start";
        END: "bd-flex-align-end";
        CENTER: "bd-flex-align-center";
        STRETCH: "bd-flex-align-stretch";
        BASELINE: "bd-flex-align-baseline";
    }>;
    var Justify: Readonly<{
        START: "bd-flex-justify-start";
        END: "bd-flex-justify-end";
        CENTER: "bd-flex-justify-center";
        BETWEEN: "bd-flex-justify-between";
        AROUND: "bd-flex-justify-around";
    }>;
    var Wrap: Readonly<{
        NO_WRAP: "bd-flex-no-wrap";
        WRAP: "bd-flex-wrap";
        WRAP_REVERSE: "bd-flex-wrap-reverse";
    }>;
}

/**
 * `Components` is a utility containing commonly used React components. An instance is available on {@link BdApi}.
 */
class Components {
    /** @ignore */
    constructor();
    Tooltip: DiscordTooltip;
    SettingItem: typeof SettingItem;
    ColorInput: typeof ColorPicker;
    DropdownInput: typeof Select;
    KeybindInput: typeof Keybind;
    NumberInput: typeof Number;
    RadioInput: typeof Radio;
    SearchInput: typeof Search;
    SliderInput: typeof Slider;
    SwitchInput: typeof Switch;
    TextInput: typeof Textbox;
    SettingGroup: typeof Group;
    ErrorBoundary: typeof ErrorBoundary;
    Text: typeof Text;
    Flex: typeof Flex;
    Button: typeof Button;
    Spinner: {
        (props: SpinnerProps): react.JSX.Element;
        Type: Readonly<{
            WANDERING_CUBES: "wandering-cubes";
            CHASING_DOTS: "chasing-dots";
            PULSING_ELLIPSIS: "pulsing-ellipsis";
            SPINNING_CIRCLE: "spinning-circle";
            SPINNING_CIRCLE_SIMPLE: "spinning-circle-simple";
            LOW_MOTION: "low-motion";
        }>;
    };
}

/**
 * `Logger` is a helper class to log data in a nice and consistent way. An instance is available on {@link BdApi}.
 */
class Logger {
    #private;
    /** @ignore */
    constructor();
    /**
     * Logs an error using a collapsed error group with stacktrace.
     *
     * @param pluginName Name of the calling module
     * @param message Message or error to log
     * @param error Error object to log with the message
     */
    stacktrace(pluginName: string, message: any, error: Error): void;
    /**
     * Logs an error message.
     *
     * @param pluginName Name of the calling module
     * @param messages Messages to log
     */
    error(pluginName: string, ...messages: any[]): void;
    /**
     * Logs a warning message.
     *
     * @param pluginName Name of the calling module
     * @param messages Messages to log
     */
    warn(pluginName: string, ...messages: any[]): void;
    /**
     * Logs an informational message.
     *
     * @param pluginName Name of the calling module
     * @param messages Messages to log
     */
    info(pluginName: string, ...messages: any[]): void;
    /**
     * Logs a message used for debugging purposes.
     *
     * @param pluginName Name of the calling module.
     * @param messages Messages to log
     */
    debug(pluginName: string, ...messages: any[]): void;
    /**
     * Logs a basic message.
     *
     * @param pluginName Name of the calling module.
     * @param messages Messages to log
     */
    log(pluginName: string, ...messages: any[]): void;
}
/**
 * `BoundLogger` is a helper class to log data in a nice and consistent way, with plugin scoping automatically supplied.
 * An instance is available on instances of {@link BdApi}.
 */
class BoundLogger {
    #private;
    /** @ignore */
    constructor(pluginName: string);
    /**
     * Logs an error using a collapsed error group with stacktrace.
     *
     * @param message Message or error to log
     * @param error Error object to log with the message
     */
    stacktrace(message: any, error: Error): void;
    /**
     * Logs an error message.
     *
     * @param messages Messages to log
     */
    error(...messages: any[]): void;
    /**
     * Logs a warning message.
     *
     * @param messages Messages to log
     */
    warn(...messages: any[]): void;
    /**
     * Logs an informational message.
     *
     * @param messages Messages to log
     */
    info(...messages: any[]): void;
    /**
     * Logs a message used for debugging purposes.
     *
     * @param messages Messages to log
     */
    debug(...messages: any[]): void;
    /**
     * Logs a basic message.
     *
     * @param messages Messages to log
     */
    log(...messages: any[]): void;
}

const enum OptionType {
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11
}
interface Choice {
    name: string;
    value: string | number;
}
interface Option {
    description?: string;
    name: string;
    required?: boolean;
    type: OptionType;
    maxLength?: number;
    minLength?: number;
    maxValue?: number;
    minValue?: number;
    choices?: Choice[];
}
interface Command {
    name: string;
    description?: string;
    id: string;
    options?: Option[];
    execute(options: any[], props: {
        channel: Channel;
        guild?: Guild;
    }): void;
    predicate?(): boolean;
}

/**
 * `CommandAPI` is a utility class for managing commands. An instance is available on {@link BdApi}.
 * This allows plugins to register and manage their own commands.
 */
class CommandAPI {
    Types: {
        OptionTypes: {
            SUB_COMMAND: number;
            SUB_COMMAND_GROUP: number;
            STRING: number;
            INTEGER: number;
            BOOLEAN: number;
            USER: number;
            CHANNEL: number;
            ROLE: number;
            MENTIONABLE: number;
            NUMBER: number;
            ATTACHMENT: number;
        };
        CommandTypes: {
            CHAT_INPUT: number;
            USER: number;
            MESSAGE: number;
        };
        InputTypes: {
            BUILT_IN: number;
            TEXT: number;
            SEARCH: number;
            BOT: number;
            PLACEHOLDER: number;
        };
        MessageEmbedTypes: {
            IMAGE: string;
            VIDEO: string;
            LINK: string;
            ARTICLE: string;
            TWEET: string;
            RICH: string;
            GIFV: string;
            APPLICATION_NEWS: string;
            AUTO_MODERATION_MESSAGE: string;
            AUTO_MODERATION_NOTIFICATION: string;
            TEXT: string;
            POST_PREVIEW: string;
            GIFT: string;
            SAFETY_POLICY_NOTICE: string;
            SAFETY_SYSTEM_NOTIFICATION: string;
            VOICE_CHANNEL: string;
            GAMING_PROFILE: string;
        };
    };
    /** @ignore */
    constructor();
    /**
     * Registers a new command
     * @param caller Caller name
     * @param command Command object
     * @returns Unregister function
     */
    register(caller: string, command: Command): (() => void) | undefined;
    /**
     * Unregisters a command
     * @param caller Caller name
     * @param commandId Command ID
     */
    unregister(caller: string, commandId: string): void;
    /**
     * Unregisters all commands for a specific caller
     * @param caller Name of the caller whose commands should be unregistered
     */
    unregisterAll(caller: string): void;
    /**
     * Gets all commands registered by a specific caller
     * @param caller Name of the caller whose commands should be retrieved
     * @returns Array of command objects registered by the caller
     */
    getCommandsByCaller(caller: string): Command[];
}
/**
 * `CommandAPI` is a utility class for managing commands, with plugin scoping automatically supplied.
 * An instance is available on instances of {@link BdApi}.
 * This allows plugins to register and manage their own commands.
 */
class BoundCommandAPI {
    #private;
    /** @ignore */
    constructor(callerName: string);
    Types: {
        OptionTypes: {
            SUB_COMMAND: number;
            SUB_COMMAND_GROUP: number;
            STRING: number;
            INTEGER: number;
            BOOLEAN: number;
            USER: number;
            CHANNEL: number;
            ROLE: number;
            MENTIONABLE: number;
            NUMBER: number;
            ATTACHMENT: number;
        };
        CommandTypes: {
            CHAT_INPUT: number;
            USER: number;
            MESSAGE: number;
        };
        InputTypes: {
            BUILT_IN: number;
            TEXT: number;
            SEARCH: number;
            BOT: number;
            PLACEHOLDER: number;
        };
        MessageEmbedTypes: {
            IMAGE: string;
            VIDEO: string;
            LINK: string;
            ARTICLE: string;
            TWEET: string;
            RICH: string;
            GIFV: string;
            APPLICATION_NEWS: string;
            AUTO_MODERATION_MESSAGE: string;
            AUTO_MODERATION_NOTIFICATION: string;
            TEXT: string;
            POST_PREVIEW: string;
            GIFT: string;
            SAFETY_POLICY_NOTICE: string;
            SAFETY_SYSTEM_NOTIFICATION: string;
            VOICE_CHANNEL: string;
            GAMING_PROFILE: string;
        };
    };
    /**
     * Registers a new command
     * @param command Command object
     * @returns Unregister function
     */
    register(command: Command): (() => void) | undefined;
    /**
     * Unregisters a command
     * @param commandId Command ID
     */
    unregister(commandId: string): void;
    /**
     * Unregisters all commands made by this bound api
     */
    unregisterAll(): void;
    /**
     * Gets all commands registered by this bound api
     * @returns Array of command objects registered by the caller
     */
    getCommandsByCaller(): Command[];
}

interface AnimateOptions {
    /** Optional function that calculating progress based on current time fraction. Linear by default. */
    timing?: (timeFraction: number) => number;
}
class BaseDOM {
    /** @ignore */
    constructor();
    /**
     * The current width of the user's screen.
     */
    get screenWidth(): number;
    /**
     * The current height of the user's screen.
     */
    get screenHeight(): number;
    /**
     * Adds a listener for when the node is removed from the document body.
     * @param node Node to be observed
     * @param callback Function to run when removed
     */
    onRemoved(node: HTMLElement, callback: () => void): () => void;
    /**
     * Adds a listener for when a node matching a selector is added to the document body.
     * The listener is automatically removed upon firing.
     * The callback is given the matching element.
     * @param selector A CSS selector for the node to wait for
     * @param callback Function to be performed on event
     */
    onAdded(selector: string, callback: () => void): void | (() => void);
    /**
     * Utility to help smoothly animate using JavaScript.
     * @param update Render function indicating the style should be updated
     * @param duration Duration in ms to animate for
     * @param [options] Options to customize the animation
     */
    animate(update: (p: number) => void, duration: number, options?: AnimateOptions): () => void;
    /**
     * Utility function to make creating DOM elements easier. Acts similarly
     * to `React.createElement`
     * @param tag HTML tag name to create
     * @param [options] Options object to customize the element
     * @param [children] Child nodes to add
     * @returns The created HTML element
     */
    createElement<T extends keyof HTMLElementTagNameMap>(tag: T, options?: Partial<HTMLElementTagNameMap[T]>, ...children: Array<Node | string>): HTMLElement;
    /**
     * Parses a string of HTML and returns the results. If the second parameter is true,
     * the parsed HTML will be returned as a [document fragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment).
     * This is extremely useful if you have a list of elements at the top level, they can then be appended all at once to another node.
     *
     * If the second parameter is false, then the return value will be the list of parsed
     * nodes and there were multiple top level nodes, otherwise the single node is returned.
     *
     * @param html HTML to be parsed
     * @param [fragment=false] Whether or not the return should be the raw `DocumentFragment`
     * @returns The result of HTML parsing
     */
    parseHTML(html: string, fragment?: boolean): Node | NodeListOf<ChildNode>;
}
/**
 * `DOM` is a simple utility class for dom manipulation. An instance is available on {@link BdApi}.
 */
class DOM extends BaseDOM {
    /** @ignore */
    constructor();
    /**
     * Adds a `<style>` to the document with the given ID.
     *
     * @param id ID to use for style element
     * @param css CSS to apply to the document
     */
    addStyle(id: string, css: string): void;
    /**
     * Removes a `<style>` from the document corresponding to the given ID.
     *
     * @param id ID used for the style element
     */
    removeStyle(id: string): void;
}
/**
 * `BoundDOM` is a simple utility class for dom manipulation, with plugin scoping optionally automatically supplied.
 * An instance is available on instances of {@link BdApi}.
 */
class BoundDOM extends BaseDOM {
    #private;
    /** @ignore */
    constructor(callerName: string);
    /**
     * Adds a `<style>` to the document with the given ID.
     *
     * @param id ID to use for style element
     * @param css CSS to apply to the document
     */
    addStyle(css: string): void;
    addStyle(id: string, css: string): void;
    /**
     * Removes a `<style>` from the document corresponding to the given ID.
     *
     * @param id ID used for the style element
     */
    removeStyle(id?: string): void;
}

/**
 * `Data` is a simple utility class for the management of plugin data. An instance is available on {@link BdApi}.
 */
class Data {
    /** @ignore */
    constructor();
    /**
     * Saves JSON-serializable data.
     *
     * @param pluginName Name of the plugin saving data
     * @param key Which piece of data to store
     * @param data The data to be saved
     */
    save(pluginName: string, key: string, data: any): void;
    /**
     * Loads previously stored data.
     *
     * @param pluginName Name of the plugin loading data
     * @param key Which piece of data to load
     * @returns The stored data
     */
    load(pluginName: string, key: string): unknown;
    /**
     * Recaches JSON-serializable save file.
     *
     * @param pluginName Name of the plugin saving data
     * @returns Whether the data successfully recached
     *
     * ⚠️ **Use of recaching is discouraged!**
     *
     * Recache loads can block the filesystem and significantly degrade performance.
     * Use this method only for **debugging or testing purposes**. Avoid frequent recaching in production environments.
     */
    recache(pluginName: string): Promise<boolean>;
    /**
     * Deletes a piece of stored data. This is different than saving `null` or `undefined`.
     *
     * @param pluginName Name of the plugin deleting data
     * @param key Which piece of data to delete.
     */
    delete(pluginName: string, key: string): void;
}
/**
 * `BoundData` is a simple utility class for the management of plugin data, with plugin scoping automatically supplied.
 * An instance is available on instances of {@link BdApi}.
 */
class BoundData {
    #private;
    /** @ignore */
    constructor(pluginName: string);
    /**
     * Saves JSON-serializable data.
     *
     * @param key Which piece of data to store
     * @param data The data to be saved
     */
    save(key: string, data: any): void;
    /**
     * Loads previously stored data.
     *
     * @param key Which piece of data to load
     * @returns The stored data
     */
    load<T>(key: string): T;
    /**
     * Recaches JSON-serializable save file.
     *
     * @returns Whether the data successfully recached
     *
     * ⚠️ **Use of recaching is discouraged!**
     *
     * Recache loads can block the filesystem and significantly degrade performance.
     * Use this method only for **debugging or testing purposes**. Avoid frequent recaching in production environments.
     */
    recache(): Promise<boolean>;
    /**
     * Deletes a piece of stored data. This is different than saving `null` or `undefined`.
     *
     * @param key Which piece of data to delete.
     */
    delete(key: string): void;
}

type StringKeys<T extends object> = Extract<keyof T, string>;

/**
 * Patcher that can patch other functions allowing you to run code before, after or
 * instead of the original function. Can also alter arguments and return values.
 */

interface GenericChildPatch {
    caller: string;
    type: "before" | "instead" | "after";
    id: number;
    callback: (...a: any[]) => any;
    unpatch: () => void;
}
type BeforeCallback<F extends (...a: any[]) => any = (...a: any[]) => any> = (thisObject: ThisType<F>, args: Parameters<F>) => void;
type InsteadCallback<F extends (...a: any[]) => any = (...a: any[]) => any> = (thisObject: ThisType<F>, args: Parameters<F>, originalFunction: F) => any;
type AfterCallback<F extends (...a: any[]) => any = (...a: any[]) => any> = (thisObject: ThisType<F>, args: Parameters<F>, returnValue: ReturnType<F>) => any;

type AsBeforeCallback<M extends object, K extends StringKeys<M>> = M[K] extends (...a: any[]) => any ? BeforeCallback<M[K]> : never;
type AsAfterCallback<M extends object, K extends StringKeys<M>> = M[K] extends (...a: any[]) => any ? AfterCallback<M[K]> : never;
type AsInsteadCallback<M extends object, K extends StringKeys<M>> = M[K] extends (...a: any[]) => any ? InsteadCallback<M[K]> : never;
/**
 * `Patcher` is a utility class for modifying existing functions. An instance is available on {@link BdApi}.
 * This is extremely useful for modifying the internals of Discord by adjusting return values of React renders, or arguments of internal functions.
 */
class Patcher {
    /** @ignore */
    constructor();
    /**
     * This method patches onto another function, allowing your code to run beforehand.
     * Using this, you are also able to modify the incoming arguments before the original method is run.
     *
     * @param caller Name of the caller of the patch function
     * @param moduleToPatch Object with the function to be patched. Can also be an object's prototype.
     * @param functionName Name of the function to be patched
     * @param callback Function to run before the original method. The function is given the `this` context and the `arguments` of the original function.
     * @returns Function that cancels the original patch
     */
    before<M extends object, K extends StringKeys<M>>(caller: string, moduleToPatch: M, functionName: K, callback: AsBeforeCallback<M, K>): (() => void) | null;
    /**
     * This method patches onto another function, allowing your code to run instead.
     * Using this, you are able to replace the original completely. You can still call the original manually if needed.
     *
     * @param caller Name of the caller of the patch function
     * @param moduleToPatch Object with the function to be patched. Can also be an object's prototype.
     * @param functionName Name of the function to be patched
     * @param callback Function to run before the original method. The function is given the `this` context, `arguments` of the original function, and also the original function.
     * @returns Function that cancels the original patch
     */
    instead<M extends object, K extends StringKeys<M>>(caller: string, moduleToPatch: M, functionName: K, callback: AsInsteadCallback<M, K>): (() => void) | null;
    /**
     * This method patches onto another function, allowing your code to run afterwards.
     * Using this, you are able to modify the return value after the original method is run.
     *
     * @param caller Name of the caller of the patch function
     * @param moduleToPatch Object with the function to be patched. Can also be an object's prototype.
     * @param functionName Name of the function to be patched
     * @param callback Function to run after the original method. The function is given the `this` context, the `arguments` of the original function, and the `return` value of the original function.
     * @returns Function that cancels the original patch
     */
    after<M extends object, K extends StringKeys<M>>(caller: string, moduleToPatch: M, functionName: K, callback: AsAfterCallback<M, K>): (() => void) | null;
    /**
     * Returns all patches by a particular caller. The patches all have an `unpatch()` method.
     *
     * @param caller ID of the original patches
     * @returns Array of all the patch objects
     */
    getPatchesByCaller(caller: string): void | GenericChildPatch[];
    /**
     * Automatically cancels all patches created with a specific ID.
     *
     * @param caller ID of the original patches
     */
    unpatchAll(caller: string): void;
}
/**
 * `BoundPatcher` is a utility class for modifying existing functions, with plugin scoping automatically supplied.
 * An instance is available on instances of {@link BdApi}.
 * This is extremely useful for modifying the internals of Discord by adjusting return values of React renders, or arguments of internal functions.
 */
class BoundPatcher {
    #private;
    /** @ignore */
    constructor(callerName: string);
    /**
     * This method patches onto another function, allowing your code to run beforehand.
     * Using this, you are also able to modify the incoming arguments before the original method is run.
     *
     * @param moduleToPatch Object with the function to be patched. Can also be an object's prototype.
     * @param functionName Name of the function to be patched
     * @param callback Function to run before the original method. The function is given the `this` context and the `arguments` of the original function.
     * @returns Function that cancels the original patch
     */
    before<M extends object, K extends StringKeys<M>>(moduleToPatch: M, functionName: K, callback: AsBeforeCallback<M, K>): (() => void) | null;
    /**
     * This method patches onto another function, allowing your code to run instead.
     * Using this, you are able to replace the original completely. You can still call the original manually if needed.
     *
     * @param moduleToPatch Object with the function to be patched. Can also be an object's prototype.
     * @param functionName Name of the function to be patched
     * @param callback Function to run before the original method. The function is given the `this` context, `arguments` of the original function, and also the original function.
     * @returns Function that cancels the original patch
     */
    instead<M extends object, K extends StringKeys<M>>(moduleToPatch: M, functionName: K, callback: AsInsteadCallback<M, K>): (() => void) | null;
    /**
     * This method patches onto another function, allowing your code to run afterwards.
     * Using this, you are able to modify the return value after the original method is run.
     *
     * @param moduleToPatch Object with the function to be patched. Can also be an object's prototype.
     * @param functionName Name of the function to be patched
     * @param callback Function to run after the original method. The function is given the `this` context, the `arguments` of the original function, and the `return` value of the original function.
     * @returns Function that cancels the original patch
     */
    after<M extends object, K extends StringKeys<M>>(moduleToPatch: M, functionName: K, callback: AsAfterCallback<M, K>): (() => void) | null;
    /**
     * Returns all patches by this bound api. The patches all have an `unpatch()` method.
     * @returns Array of all the patch objects
     */
    getPatchesByCaller(): GenericChildPatch[];
    /**
     * Automatically cancels all patches created by this bound api
     */
    unpatchAll(): void;
}

type StoreType = Store | FluxStore;
function useStateFromStores<T>(stores: StoreType | StoreType[], factory: () => T, deps?: react__default.DependencyList, isStateEqual?: true | ((oldState: T, newState: T) => boolean)): T;
function useForceUpdate(): [number, react__default.ActionDispatch<any>];

class BaseHooks {
    /** @ignore */
    constructor();
    /**
     * Subscribes to one or more stores and re-computes a value when they change, causing a re-render.
     * A store is anything with an `addChangeListener` and `removeChangeListener` method,
     * such as Discord's Flux stores or BdApi.Utils.Store.
     *
     * @param stores The store(s) to subscribe to
     * @param factory A function that computes the value to return when stores change
     * @param deps An optional dependency list that controls when the factory function is updated
     * @param isStateEqual An optional function that allows for skipping re-renders if the state hasn't changed
     */
    useStateFromStores: typeof useStateFromStores;
    /**
     * Creates a hook that forces a re-render when called.
     */
    useForceUpdate: typeof useForceUpdate;
}
/**
 * `Hooks` is a utility class for React hooks. An instance is available on {@link BdApi}.
 */
class Hooks extends BaseHooks {
    /** @ignore */
    constructor();
    /**
     * Retrieves data from storage and automatically re-renders when it changes.
     *
     * @param caller The name of the plugin to use data from
     * @param key The key of the data to retrieve
     * @returns The current value of the data with the given key, or undefined if it doesn't exist
     */
    useData<T>(caller: string, key: string): T;
}
/**
 * `BoundHooks` is a utility class for React hooks, with plugin scoping automatically supplied.
 * An instance is available on instances of {@link BdApi}.
 */
class BoundHooks extends BaseHooks {
    #private;
    /** @ignore */
    constructor(callerName: string);
    /**
     * Retrieves data from storage and automatically re-renders when it changes.
     *
     * @param key The key of the data to retrieve
     * @returns The current value of the data with the given key, or undefined if it doesn't exist
     */
    useData<T>(key: string): T;
}

/**
 * `BdApi` is a globally (`window.BdApi`) accessible object for use by plugins and developers to make their lives easier.
 * It can be instantiated (`new BdApi("MyPlugin")`) to get a version of the API with automatic scoping for plugins,
 * or its static properties can be used directly.
 */
class BdApi {
    /** The React module being used inside Discord */
    get React(): typeof react;
    /** The React module being used inside Discord */
    static React: typeof react;
    /** The ReactDOM module being used inside Discord */
    get ReactDOM(): typeof react_dom & typeof react_dom_client;
    /** The ReactDOM module being used inside Discord */
    static ReactDOM: typeof react_dom & typeof react_dom_client;
    /** A reference string for BD's version */
    get version(): string;
    /** A reference string for BD's version */
    static version: string;
    /** A set of react components plugins can make use of */
    get Components(): Components;
    /** A set of react components plugins can make use of */
    static Components: Components;
    /** An instance of {@link Net} for using network related tools */
    get Net(): Net;
    /** An instance of {@link Net} for using network related tools */
    static Net: Net;
    /** An instance of {@link Webpack} to search for modules */
    get Webpack(): Webpack;
    /** An instance of {@link Webpack} to search for modules */
    static Webpack: Webpack;
    /** An instance of {@link AddonAPI} to access plugins */
    get Plugins(): AddonAPI;
    /** An instance of {@link AddonAPI} to access plugins */
    static Plugins: AddonAPI;
    /** An instance of {@link AddonAPI} to access themes */
    get Themes(): AddonAPI;
    /** An instance of {@link AddonAPI} to access themes */
    static Themes: AddonAPI;
    /** An instance of {@link Utils} for general utility functions */
    get Utils(): Utils;
    /** An instance of {@link Utils} for general utility functions */
    static Utils: Utils;
    /** An instance of {@link UI} to create interfaces */
    get UI(): UI;
    /** An instance of {@link UI} to create interfaces */
    static UI: UI;
    /** An instance of {@link ReactUtils} to work with React */
    get ReactUtils(): ReactUtils;
    /** An instance of {@link ReactUtils} to work with React */
    static ReactUtils: ReactUtils;
    /** An instance of {@link ContextMenu} for interacting with context menus */
    get ContextMenu(): ContextMenu;
    /** An instance of {@link ContextMenu} for interacting with context menus */
    static ContextMenu: ContextMenu;
    /** An instance of {@link Patcher} to monkey patch functions */
    get Patcher(): BoundPatcher;
    /** An instance of {@link Patcher} to monkey patch functions */
    static Patcher: Patcher;
    /** An instance of {@link Data} to manage data */
    get Data(): BoundData;
    /** An instance of {@link Data} to manage data */
    static Data: Data;
    /** An instance of {@link DOM} to interact with the DOM */
    get DOM(): BoundDOM;
    /** An instance of {@link DOM} to interact with the DOM */
    static DOM: DOM;
    /** An instance of {@link Logger} for logging information */
    get Logger(): BoundLogger;
    /** An instance of {@link Logger} for logging information */
    static Logger: Logger;
    /** An instance of {@link CommandAPI} for adding slash commands */
    get Commands(): BoundCommandAPI;
    /** An instance of {@link CommandAPI} for adding slash commands */
    static Commands: CommandAPI;
    /** An instance of {@link Hooks} for react hooks */
    get Hooks(): BoundHooks;
    /** An instance of {@link Hooks} for react hooks */
    static Hooks: Hooks;
    constructor(pluginName: string);
}

}

const BdApi: typeof BetterDiscord.BdApi;
interface Window {
    BdApi: typeof BetterDiscord.BdApi;
}
}
# @veera0220/ui-design

A lightweight, zero-dependency React component library written in TypeScript.

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, ghost, danger variants with loading state |
| `Input` | Text input with label, helper text, status, and addons |
| `Badge` | Status/label badges with 6 color variants |
| `Card` | Content container with optional header, footer |
| `Modal` | Accessible dialog with keyboard and backdrop dismiss |
| `ToastProvider` + `useToast` | Context-based notification system |
| `Spinner` | Loading indicator in 4 sizes |
| `Select` | Custom dropdown with keyboard support |
| `Checkbox` | Checkbox with indeterminate state |
| `Avatar` + `AvatarGroup` | User avatars with fallback initials |

## Hooks

| Hook | Description |
|------|-------------|
| `useDisclosure` | Manage open/close boolean state |
| `useLocalStorage` | State synced with localStorage |

## Installation

```bash
# Add to .npmrc first (see Publishing section)
npm install @veera0220/ui-design
```

## Usage

```tsx
import {
  Button,
  Input,
  Badge,
  Card,
  Modal,
  ToastProvider,
  useToast,
  Spinner,
  Select,
  Checkbox,
  Avatar,
  AvatarGroup,
  useDisclosure,
} from "@veera0220/ui-design";

// Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider>
      <MyApp />
    </ToastProvider>
  );
}

// Use toast anywhere inside the provider
function MyApp() {
  const { toast } = useToast();
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <Button
        label="Save"
        variant="primary"
        onClick={() => toast({ type: "success", title: "Saved!" })}
      />

      <Button label="Open Modal" onClick={open} />
      <Modal open={isOpen} onClose={close} title="Confirm" size="sm">
        <p>Are you sure?</p>
      </Modal>

      <Input label="Email" placeholder="you@example.com" status="error" helperText="Invalid email" />

      <Badge label="Active" variant="success" dot />

      <Select
        label="Role"
        options={[
          { value: "admin", label: "Admin" },
          { value: "user",  label: "User" },
        ]}
        value="user"
        onChange={(v) => console.log(v)}
      />

      <Checkbox label="Accept terms" checked onChange={(v) => console.log(v)} />

      <Avatar name="Veera Pandi" status="online" />
      <AvatarGroup
        avatars={[{ name: "Alice" }, { name: "Bob" }, { name: "Carol" }]}
        max={2}
      />

      <Spinner size="md" />
    </>
  );
}
```

## Build

```bash
npm install
npm run build
# Output: dist/cjs/  dist/esm/  dist/types/
```

## Publishing to GitHub Packages

1. Create a GitHub Personal Access Token with `write:packages` scope.
2. Add to `.npmrc`:
   ```
   @your-username:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_TOKEN
   ```
3. Update `name` in `package.json` to `@veera0220/ui-design`.
4. Run:
   ```bash
   npm publish
   ```

## Peer Dependencies

React 17+ is required and must be installed in the consuming project:

```bash
npm install react react-dom
```

# Components

This layer include [React components](https://facebook.github.io/react/docs/react-component.html) that let you split the UI into independent, reusable pieces, and think about each piece in isolation.

## Add a new component

To add a new page in Home.jsx (with side-bar and top-bar) :

- In components/Home.jsx
- Inside the [Switch] tag

```jsx
<SidebarMain>
            <Switch>
            {/* Add your <Route/> here! */}
             </Switch>
</SidebarMain>
```

- Add your component route between [Switch] tag to load in home page

```javascript
<Route path="/route-name" component={ComponentName} />
```

To add a new item for menu bar

- In components/Home.jsx
- Inside the [Menu] tag

```javascript
   <SidebarContent>
      <Menu style={{ color: "rgb(117, 117, 117)", width: '210px' }}>
       {/* Add you <NavLink /> here */}
      </Menu>
    </SidebarContent>
```

- Add your component NavLink between [Menu] tag

```javascript
<NavLink to='/route-name'>
    <MenuItem primaryText="MenuItemName" style={{ color: "rgb(117, 117, 117)" }} leftIcon={<SvgIcon />} />
    {/* Other menu itemes  */}
</NavLink>
```

*Note: You can choose your icon for [SvgIcon] from [material-ui icons](http://www.material-ui.com/#/components/svg-icon)*

To add your page in Master page (without side-bar menu and top-bar)

- In components/Master/Master.tsx
- Add your [Route] tag between [Switch] tag

```javascript
<Switch>
         <Route path='/route-name' component={ComponentName} />
         {/* Other routes  */}
</Switch>
```

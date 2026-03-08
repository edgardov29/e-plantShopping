import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const existingItem = state.items.find(
            item => item.name === action.payload.name
        );

        if (existingItem) {
            // si ya existe, incrementa la cantidad
            existingItem.quantity = existingItem.quantity + 1;
        } else {
            // si no existe, agrega un nuevo objeto
            state.items.push({
                ...action.payload, // copia name, price, etc.
                quantity: 1,       // inicializa cantidad
            });
        }
    },

    removeItem: (state, action) => {
    },
    updateQuantity: (state, action) => {

    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

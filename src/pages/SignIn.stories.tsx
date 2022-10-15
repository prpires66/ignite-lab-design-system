import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { rest } from 'msw'
import { SignIn } from "./SignIn"

export default {
    title: 'Pages/Sign in',
    component: SignIn,
    args: {},
    argTypes: {},
    parameters: {
        msw: {
            handlers: [
                rest.post('/session', (req, res, ctx) => {
                    return res(ctx.json({
                        message: 'Login realizado!'
                    }));
                })
            ],
        },
    }
} as Meta

export const Default: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'prires66@gmail.com')
        userEvent.type(canvas.getByPlaceholderText('*******'), '1234567')

        userEvent.click(canvas.getByRole('button'))

        await waitFor(() => {
            expect(canvas.getByText('Login realizado')).toBeInTheDocument()
        })
    }
};
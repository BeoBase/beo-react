import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the main content', () => {
    render(<App />)
    
    expect(
      screen.getByText('Get started')
    ).toBeInTheDocument()
    //
    // expect(
    //   screen.getByText('Edit src/App.tsx and save to test HMR')
    // ).toBeInTheDocument()
  })
  
  it('starts the counter at 0', () => {
    render(<App />)
    
    expect(screen.getByText('Count is 0')).toBeInTheDocument()
  })
  
  it('increments the counter when clicked', () => {
    render(<App />)
    
    const button = screen.getByRole('button', {
      name: /count is 0/i,
    })
    
    fireEvent.click(button)
    
    expect(screen.getByText('Count is 1')).toBeInTheDocument()
  })
  
  it('increments the counter multiple times', () => {
    render(<App />)
    
    const button = screen.getByRole('button', {
      name: /count is 0/i,
    })
    
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)
    
    expect(screen.getByText('Count is 3')).toBeInTheDocument()
  })
  
  it('renders the Tailwind button', () => {
    render(<App />)
    
    expect(
      screen.getByRole('button', {
        name: 'Tailwind Button',
      })
    ).toBeInTheDocument()
  })
  
  it('renders Documentation section', () => {
    render(<App />)
    
    expect(screen.getByText('Documentation')).toBeInTheDocument()
    expect(screen.getByText('Your questions, answered')).toBeInTheDocument()
  })
  
  it('renders Connect with us section', () => {
    render(<App />)
    
    expect(screen.getByText('Connect with us')).toBeInTheDocument()
    expect(
      screen.getByText('Join the Vite community')
    ).toBeInTheDocument()
  })
  
  it('renders Vite documentation link', () => {
    render(<App />)
    
    const link = screen.getByRole('link', {
      name: /Explore Vite/i,
    })
    
    expect(link).toHaveAttribute('href', 'https://vite.dev/')
  })
  
  it('renders React documentation link', () => {
    render(<App />)
    
    const link = screen.getByRole('link', {
      name: /Learn more/i,
    })
    
    expect(link).toHaveAttribute('href', 'https://react.dev/')
  })
  
  it('renders GitHub link', () => {
    render(<App />)
    
    const link = screen.getByRole('link', {
      name: 'GitHub',
    })
    
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/vitejs/vite'
    )
  })
  
  it('renders Discord link', () => {
    render(<App />)
    
    const link = screen.getByRole('link', {
      name: 'Discord',
    })
    
    expect(link).toHaveAttribute(
      'href',
      'https://chat.vite.dev/'
    )
  })
  
  it('renders X.com link', () => {
    render(<App />)
    
    const link = screen.getByRole('link', {
      name: 'X.com',
    })
    
    expect(link).toHaveAttribute(
      'href',
      'https://x.com/vite_js'
    )
  })
  
  it('renders Bluesky link', () => {
    render(<App />)
    
    const link = screen.getByRole('link', {
      name: 'Bluesky',
    })
    
    expect(link).toHaveAttribute(
      'href',
      'https://bsky.app/profile/vite.dev'
    )
  })
})